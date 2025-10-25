import queryString from "query-string";

const fixedHeader = "function handler(req, res) {";
const fixedFooter = "}";

// Initialize the worker
export function runFunction(
    funcString: string,
    queriesString: string,
    body: any
) {
    return new Promise((resolve, reject) => {
        // Create worker from a Blob URL to embed worker code directly
        const workerCode = `
                // --- Web Worker Script ---

                // 1. Neuter/Undefine sensitive APIs
                // Strict mode for the worker
                'use strict';

                const originalConsole = self.console;
                self.console = undefined; 

                // Network
                self.fetch = () => Promise.reject(new Error('Fetch API is disabled in this sandbox.'));
                self.XMLHttpRequest = function() { throw new Error('XMLHttpRequest is disabled in this sandbox.'); };
                self.WebSocket = function() { throw new Error('WebSocket is disabled in this sandbox.'); };
                self.EventSource = function() { throw new Error('EventSource is disabled in this sandbox.'); };

                // Storage
                try {
                    Object.defineProperty(self, 'localStorage', { get: () => { throw new Error('localStorage is disabled.'); } });
                    Object.defineProperty(self, 'sessionStorage', { get: () => { throw new Error('sessionStorage is disabled.'); } });
                    Object.defineProperty(self, 'indexedDB', { get: () => { throw new Error('indexedDB is disabled.'); } });
                    Object.defineProperty(self, 'caches', { get: () => { throw new Error('Caches API is disabled.'); } });
                } catch (e) {
                    originalConsole.warn('Could not redefine storage properties:', e.message);
                }


                // Worker control
                self.importScripts = function() { throw new Error('importScripts is disabled in this sandbox.'); };
                if (self.navigator && self.navigator.serviceWorker) {
                    self.navigator.serviceWorker = undefined;
                }
                
                // Location
                if (self.navigator && self.navigator.geolocation) {
                    self.navigator.geolocation = undefined;
                }

                // Other potentially sensitive global properties (this is not exhaustive)
                // self.open = undefined; // for window.open like behavior if ever possible in worker
                // self.alert = undefined; // not typically available but good practice
                // self.confirm = undefined;
                // self.prompt = undefined;
                
                // DOM related (mostly not available, but to be sure)
                self.document = undefined;
                self.window = undefined; // self is the global scope, but good to undefine 'window' explicitly

                // Access to global constructors that might be misused for prototype pollution or other attacks
                // (Be careful with this, as it might break legitimate user code if they rely on these for type checks etc.)
                // Example:
                Object.constructor = undefined; 
                Array.constructor = undefined;
                
                self.onmessage = function(event) {
                    originalConsole.log('Worker received message:', event.data);
                    const { queries, body } = event.data;
                    


                    const finalFunction = ${fixedHeader}${funcString}${fixedFooter};

                    try {
                        // 2. Create the function using new Function.
                        // The userFunctionString is the BODY of the function.
                        // 'queries' and 'body' are the parameter names.
                        
                        Function.constructor = undefined; // This would break our own use of new Function if done before it.
                        
                        // 3. Execute the user's function
                        const result = finalFunction(queries, body);

                        
                        // 4. Send the result back
                        self.postMessage({ success: true, result: result });
                    } catch (error) {
                        self.postMessage({ 
                            success: false, 
                            error: { 
                                name: error.name, 
                                message: error.message, 
                                stack: error.stack // Be cautious about sending full stack traces to the client
                            }
                        });
                    }
                };
            `;

        const blob = new Blob([workerCode], { type: "application/javascript" });
        const worker = new Worker(URL.createObjectURL(blob));

        worker.onmessage = function (event) {
            console.log("worker", event);
            if (event.data.success) {
                console.log(
                    "Result:\n" + JSON.stringify(event.data.result, null, 2)
                );
                resolve(event.data.result);
            } else {
                let errorMessage =
                    "Error: " +
                    event.data.error.name +
                    " - " +
                    event.data.error.message;
                if (event.data.error.stack) {
                    // Optionally, include stack for debugging, but be mindful of info disclosure
                    // errorMessage += '\nStack: ' + event.data.error.stack;
                }
                console.log("errorMessage", errorMessage);
                reject(errorMessage);
            }
        };

        worker.onerror = function (error) {
            console.error("Worker error:", error);
            reject(error);
            // Re-initialize worker on catastrophic error if needed, or provide a reset button
            // initializeWorker();
        };

        worker.postMessage({
            queries: queryString.parse(queriesString),
            body: body,
        });
    });
}
