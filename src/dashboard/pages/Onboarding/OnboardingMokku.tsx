import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/dashboard/components/ui/card";
import { Button } from "@/dashboard/components/ui/button";
import { Progress } from "@/dashboard/components/ui/progress";
import {
    Rocket,
    Shield,
    Zap,
    Code,
    Layers,
    Settings,
    ArrowRight,
    Star,
    Play,
    Heart,
    CloudOff,
    Clock,
    FileCode,
    Network,
    Copy,
    Chrome,
    MonitorSpeaker,
} from "lucide-react";
import { useState, useEffect } from "react";

interface OnboardingMokkuProps {
    onGetStarted?: () => void;
    onCreateMock?: () => void;
    showInteractive?: boolean;
}

export const OnboardingMokku = ({
    onGetStarted,
    onCreateMock,
    showInteractive = true,
}: OnboardingMokkuProps) => {
    const [currentFeature, setCurrentFeature] = useState(0);
    const [progress, setProgress] = useState(0);

    const mokkuFeatures = [
        {
            icon: <Network className="w-6 h-6" />,
            title: "API Mocking Made Simple",
            description:
                "Intercept HTTP requests and return custom responses without backend changes",
            details:
                "Perfect for frontend development, testing, and prototyping",
            color: "blue",
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: "REST & GraphQL Support",
            description: "Mock both REST APIs and GraphQL endpoints with ease",
            details: "Full support for all HTTP methods and GraphQL operations",
            color: "purple",
        },
        {
            icon: <CloudOff className="w-6 h-6" />,
            title: "Works Offline",
            description:
                "No internet required - everything runs locally in your browser",
            details:
                "Your data never leaves your device, ensuring complete privacy",
            color: "green",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Dynamic Responses",
            description:
                "Write JavaScript functions to generate dynamic mock responses",
            details: "Use custom logic, random data, or conditional responses",
            color: "yellow",
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Custom Headers",
            description: "Modify response headers and add CORS support",
            details:
                "Perfect for testing different scenarios and API behaviors",
            color: "indigo",
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: "Project Organization",
            description: "Organize mocks into projects for better management",
            details: "Keep different applications and environments separate",
            color: "pink",
        },
    ];

    const useCases = [
        {
            icon: <FileCode className="w-5 h-5" />,
            title: "Frontend Development",
            description: "Develop UI without waiting for backend APIs",
        },
        {
            icon: <MonitorSpeaker className="w-5 h-5" />,
            title: "API Testing",
            description: "Test edge cases and error scenarios easily",
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: "Rapid Prototyping",
            description: "Build prototypes with realistic data responses",
        },
        {
            icon: <Copy className="w-5 h-5" />,
            title: "Demo Preparation",
            description: "Create reliable demos with consistent data",
        },
    ];

    const benefits = [
        {
            icon: <Chrome className="w-4 h-4" />,
            text: "Chrome Extension",
            color: "blue",
        },
        {
            icon: <Shield className="w-4 h-4" />,
            text: "Privacy First",
            color: "green",
        },
        {
            icon: <Heart className="w-4 h-4" />,
            text: "Free Forever",
            color: "red",
        },
        {
            icon: <Star className="w-4 h-4" />,
            text: "Open Source",
            color: "yellow",
        },
        {
            icon: <CloudOff className="w-4 h-4" />,
            text: "Offline Ready",
            color: "purple",
        },
    ];

    useEffect(() => {
        if (showInteractive) {
            const interval = setInterval(() => {
                setCurrentFeature((prev) => (prev + 1) % mokkuFeatures.length);
                setProgress((prev) => (prev + 16.66) % 100);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [mokkuFeatures.length, showInteractive]);

    const getColorClasses = (color: string) => {
        const colors = {
            blue: "from-blue-500 to-blue-600",
            purple: "from-purple-500 to-purple-600",
            green: "from-green-500 to-green-600",
            yellow: "from-yellow-500 to-yellow-600",
            indigo: "from-indigo-500 to-indigo-600",
            pink: "from-pink-500 to-pink-600",
            red: "from-red-500 to-red-600",
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                            <Network className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Mokku
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                API Mocking Made Simple
                            </p>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to Your API Mocking Workspace
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
                        Mock HTTP requests, create dynamic responses, and
                        accelerate your development workflow. Everything runs
                        locally in your browser with complete privacy and
                        offline support.
                    </p>

                    {/* Benefits Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 bg-gradient-to-r ${getColorClasses(benefit.color)} text-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300`}
                            >
                                <span>{benefit.icon}</span>
                                <span className="text-sm font-medium">
                                    {benefit.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Button
                            onClick={onGetStarted}
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-10 py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <Play className="w-5 h-5 mr-3" />
                            Start Creating Mocks
                            <ArrowRight className="w-5 h-5 ml-3" />
                        </Button>
                        <Button
                            onClick={onCreateMock}
                            variant="outline"
                            size="lg"
                            className="text-lg px-10 py-7 rounded-2xl border-2 border-blue-200 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <Rocket className="w-5 h-5 mr-3" />
                            Quick Start Guide
                        </Button>
                    </div>
                </div>

                {/* Interactive Features Showcase */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-4">
                            Powerful Features for Modern Development
                        </h3>
                        {showInteractive && (
                            <div className="max-w-md mx-auto">
                                <Progress value={progress} className="h-2" />
                                <p className="text-sm text-muted-foreground mt-2">
                                    Auto-playing feature showcase
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {mokkuFeatures.map((feature, index) => (
                            <Card
                                key={index}
                                className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer ${
                                    showInteractive && currentFeature === index
                                        ? `ring-4 ring-${feature.color}-500 shadow-2xl transform -translate-y-2`
                                        : ""
                                }`}
                                onClick={() => setCurrentFeature(index)}
                            >
                                <CardContent className="p-8">
                                    <div className="text-center">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(feature.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                                        >
                                            <span className="text-white">
                                                {feature.icon}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-xl mb-3">
                                            {feature.title}
                                        </h4>
                                        <p className="text-muted-foreground mb-4">
                                            {feature.description}
                                        </p>
                                        <p className="text-sm text-gray-600 italic">
                                            {feature.details}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Use Cases */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Perfect for Every Development Scenario
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {useCases.map((useCase, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-lg transition-all duration-300 group"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                                            {useCase.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-2">
                                                {useCase.title}
                                            </h4>
                                            <p className="text-muted-foreground">
                                                {useCase.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Getting Started Steps */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Rocket className="w-8 h-8 text-blue-600" />
                            Ready to Get Started?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    1
                                </div>
                                <h4 className="font-semibold mb-2">
                                    Create Organization
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Set up your workspace to organize projects
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    2
                                </div>
                                <h4 className="font-semibold mb-2">
                                    Create Project
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Add projects for different applications
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    3
                                </div>
                                <h4 className="font-semibold mb-2">
                                    Add Mocks
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Create your first API mocks and start
                                    testing
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
