import { Input } from "@/dashboard/components/ui/input";
import { useState } from "react";

export const UrlTesterTestUrl = () => {
    const [state, setState] = useState<string>("");

    return (
        <Input
            value={state}
            onChange={(event) => setState(event.target.value)}
        />
    );
};
