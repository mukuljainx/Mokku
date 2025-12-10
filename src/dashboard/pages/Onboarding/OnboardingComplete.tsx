import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Badge } from "@/dashboard/components/ui/badge";
import { Button } from "@/dashboard/components/ui/button";
import {
    CheckCircle,
    Rocket,
    Shield,
    Zap,
    Database,
    Code,
    Layers,
    Settings,
    ArrowRight,
    Star,
    Play,
    Globe,
    Users,
    Heart,
} from "lucide-react";
import { useState, useEffect } from "react";

interface OnboardingProps {
    onGetStarted?: () => void;
    onCreateMock?: () => void;
    showInteractive?: boolean;
}

export const OnboardingComplete = ({
    onGetStarted,
    onCreateMock,
    showInteractive = true,
}: OnboardingProps) => {
    const [currentAnimation, setCurrentAnimation] = useState(0);

    const features = [
        {
            icon: <Layers className="w-6 h-6" />,
            title: "Project Organization",
            description:
                "Organize your mocks into separate projects for better management",
            highlight: "New",
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: "GraphQL Support",
            description: "Create and manage GraphQL mocks alongside REST APIs",
            highlight: "New",
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Dynamic Headers",
            description:
                "Modify response headers on the fly with real-time updates",
            highlight: "Enhanced",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Monaco Editor",
            description:
                "VSCode-powered editing experience for better development",
            highlight: "Improved",
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: "Function Mocks",
            description:
                "Write custom JavaScript functions for dynamic responses",
            highlight: "Beta",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Privacy First",
            description:
                "Your data remains secure in Chrome, no external servers",
            highlight: "Always",
        },
    ];

    const benefits = [
        {
            icon: <CheckCircle className="w-4 h-4" />,
            text: "No login required",
        },
        { icon: <Heart className="w-4 h-4" />, text: "Free forever" },
        { icon: <Star className="w-4 h-4" />, text: "Open source core" },
        {
            icon: <Database className="w-4 h-4" />,
            text: "Offline functionality",
        },
        { icon: <Shield className="w-4 h-4" />, text: "Privacy focused" },
    ];

    useEffect(() => {
        if (showInteractive) {
            const interval = setInterval(() => {
                setCurrentAnimation((prev) => (prev + 1) % features.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [features.length, showInteractive]);

    const handleGetStarted = () => {
        if (onGetStarted) {
            onGetStarted();
        }
    };

    const handleCreateMock = () => {
        if (onCreateMock) {
            onCreateMock();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Rocket className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Mokku V2
                            </h1>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <Badge variant="secondary" className="text-xs">
                                    Complete Rewrite
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    V2.0
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome to the Future of API Mocking
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Built from scratch with improved UI, enhanced
                        functionality, and the same privacy-first approach you
                        love. Your existing mocks have been safely migrated to
                        the new project structure.
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200"
                            >
                                <span className="text-green-600">
                                    {benefit.icon}
                                </span>
                                <span className="text-sm font-medium">
                                    {benefit.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={handleGetStarted}
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Explore Your Mocks
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            onClick={handleCreateMock}
                            variant="outline"
                            size="lg"
                            className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
                        >
                            <Code className="w-5 h-5 mr-2" />
                            Create New Mock
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-center mb-12">
                        What's New in V2
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                                    showInteractive &&
                                    currentAnimation === index
                                        ? "ring-2 ring-blue-500 shadow-xl transform -translate-y-1"
                                        : ""
                                }`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="font-semibold text-lg">
                                                    {feature.title}
                                                </h4>
                                                <Badge
                                                    variant={
                                                        feature.highlight ===
                                                        "New"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className="text-xs"
                                                >
                                                    {feature.highlight}
                                                </Badge>
                                            </div>
                                            <p className="text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Migration Success */}
                <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 mb-8">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-green-800 mb-2">
                                    Migration Successful!
                                </h3>
                                <p className="text-green-700 text-lg">
                                    All your existing mocks have been safely
                                    migrated to the new project structure. Your
                                    data remains local and secure in your
                                    browser.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Version Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-blue-200 bg-blue-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="w-6 h-6 text-blue-600" />
                                Local Version
                                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                                    Current
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Data stays in your browser</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>No internet required</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Maximum privacy</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span>Perfect for solo development</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="w-6 h-6 text-purple-600" />
                                Cloud Version
                                <Badge
                                    variant="outline"
                                    className="bg-purple-100 text-purple-700 border-purple-300"
                                >
                                    Coming Soon
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    <span>Team collaboration</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-purple-600" />
                                    <span>Sync across devices</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-purple-600" />
                                    <span>Enterprise security</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Star className="w-5 h-5 text-purple-600" />
                                    <span>Advanced team features</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
