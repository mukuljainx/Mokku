/**
 * Rule 1:
 *  if there is * or : anywhere, url is dynamic
 *  highlight whole word between /
 *
 * Rule 2:
 *  {/:id}
 *
 */

import { Fragment, useEffect, useMemo, type ComponentProps } from "react";
import { Input } from "./input";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { cn } from "@/dashboard/lib/utils";
import { Link } from "react-router";
import { getUrlInfo, isUrlDynamic } from "@/dashboard/lib/url-utils";

type InputProps = ComponentProps<typeof Input>;

type UrlInputProps = Omit<InputProps, "onError"> &
    Required<Pick<InputProps, "onChange">> & {
        value?: string;
        onError: (error: string) => void;
        clearError?: () => void;
    };

// Match any valid URI scheme per RFC 3986 (scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." ) ":")

export const UrlInput = ({ onError, clearError, ...props }: UrlInputProps) => {
    const dynamic = isUrlDynamic(props.value);
    const urlInfo = useMemo(() => getUrlInfo(props.value || ""), [props.value]);

    console.log({ urlInfo, dynamic });

    useEffect(() => {
        if (urlInfo.error) {
            onError(urlInfo.error);
        } else {
            clearError?.();
        }
    }, [urlInfo, onError, clearError]);

    return (
        <div className="flex flex-col gap-2">
            <Input {...props} />
            {dynamic && (
                <div className="flex gap-2 items-center pl-3 text-sm underline">
                    <div className="text-ellipsis overflow-hidden">
                        {urlInfo.segmentInfos.map((segment, index) => (
                            <Fragment key={index}>
                                <span
                                    className={cn(
                                        !segment.error &&
                                            segment.dynamic &&
                                            "bg-blue-100 text-blue-700",
                                        segment.error &&
                                            "bg-red-100 text-red-700"
                                    )}
                                >
                                    {segment.value}
                                </span>
                                <span>
                                    {index === urlInfo.segmentInfos.length - 1
                                        ? ""
                                        : "/"}
                                </span>
                            </Fragment>
                        ))}
                    </div>
                    <Tooltip>
                        <TooltipTrigger type="button">
                            <Info className="size-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                            This URL will be treated as dynamic,
                            <br /> We use{" "}
                            <a
                                href="https://www.npmjs.com/package/path-to-regexp/v/8.2.0"
                                target="_blank"
                                className="text-blue-500"
                            >
                                path-to-regexp v8.2.0
                            </a>{" "}
                            for route matching
                        </TooltipContent>
                    </Tooltip>
                    <Link className="shrink-0" to="/help/url-tester">
                        URL Tester
                    </Link>
                </div>
            )}
        </div>
    );
};
