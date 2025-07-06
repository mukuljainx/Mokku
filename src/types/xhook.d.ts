import "xhook";

declare module "xhook" {
    interface Request {
        mokku: {
            id: number;
        };
    }
}
