import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Badge } from "@/dashboard/components/ui/badge";
import {
    CheckCircle,
    Rocket,
    Shield,
    Zap,
    Code,
    Layers,
    Settings,
    Star,
} from "lucide-react";
import { Button } from "@/dashboard/components/ui/button";
import { Link } from "react-router";

export const OnboardingInteractive = () => {
    const features = [
        {
            icon: <Layers className="w-5 h-5" />,
            title: "Project Organization",
            description: "Organize mocks into separate projects",
            highlight: "New",
        },
        {
            icon: <Code className="w-5 h-5" />,
            title: "GraphQL Support",
            description: "Create GraphQL mocks with operation names",
            highlight: "New",
        },
        {
            icon: <Settings className="w-5 h-5" />,
            title: "Modify Headers",
            description: "Modify request headers on the fly",
            highlight: "New",
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Monaco Editor",
            description: "VSCode-powered editing experience",
            highlight: "Improved",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 h-full overflow-auto ">
            <div className="container mx-auto px-4 py-8 max-w-4xl mt-12 ">
                {/* Progress Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome to Mokku V2
                        </h1>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="text-center">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">
                                V2.0
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Complete Rewrite
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">
                                100%
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Data Preserved
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-purple-600">
                                Free
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Forever
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Features */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                What's New in V2
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {feature.title}
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {feature.highlight}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {/* Migration Info */}
                        <Card className="border-green-200 bg-green-50">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-green-800 mb-1">
                                            Migration Complete!
                                        </h3>
                                        <p className="text-sm text-green-700">
                                            All your existing mocks have been
                                            safely migrated to the new project
                                            structure. Your data remains local
                                            and secure.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Privacy Notice */}
                        <Card className="border-blue-200 bg-blue-50">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-blue-800 mb-1">
                                            Privacy First
                                        </h3>
                                        <p className="text-sm text-blue-700">
                                            Your data stays in your browser. No
                                            external servers, no tracking, no
                                            data collection. Just pure local
                                            functionality.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 mt-6">
                    <Button variant="outline" className="w-[200px]">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png?20240107144800"
                            className="h-4 mr-2"
                        />
                        <a
                            target="_blank"
                            href="https://www.youtube.com/watch?v=NDJ-UifByiE"
                        >
                            Video Walkthrough
                        </a>
                    </Button>
                    <Button className="mx-auto w-[200px] bg-blue-600 hover:bg-blue-700 text-white">
                        <Link to="/projects">Get Started</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
