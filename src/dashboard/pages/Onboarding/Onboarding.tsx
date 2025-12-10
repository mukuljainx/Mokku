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
    Globe,
    Users,
    Database,
    Code,
    Layers,
    Settings,
    ArrowRight,
    Star,
} from "lucide-react";

export const Onboarding = () => {
    const features = [
        {
            icon: <Layers className="w-6 h-6" />,
            title: "Organize with Projects",
            description:
                "Divide your mocks into separate projects for better organization",
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: "GraphQL Support",
            description: "Create and manage GraphQL mocks alongside REST APIs",
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Dynamic Headers",
            description: "Modify headers on the go with real-time updates",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Monaco Editor",
            description: "Better mock editing with VSCode's powerful editor",
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: "Function Mocks",
            description:
                "Write custom JavaScript functions for dynamic responses (Beta)",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Local Data",
            description:
                "Your data remains secure in Chrome, no external servers",
        },
    ];

    const faqs = [
        {
            question: "Why am I seeing a web app?",
            answer: "This helps in the separation of concerns and allows faster updates. Mock extensions now just contain the code for mocking API calls and showing results in the panel as before.",
        },
        {
            question: "Where is my data?",
            answer: "Your data will remain in Chrome near you! This app is just a frontend, there are no servers managing data.",
        },
        {
            question: "Will there be a Cloud version?",
            answer: "Yes there will be a cloud version, but the local version is not going anywhere! You will always have a choice between Cloud or local. We advise the local version if you are working alone. Cloud version is meant for teams.",
        },
        {
            question: "How many organizations can I create?",
            answer: "For now only 1 organization.",
        },
        {
            question: "How many projects can I create?",
            answer: "You can create up to 5 projects per organization.",
        },
    ];

    const benefits = [
        "No login required",
        "Free forever",
        "Open source core",
        "Offline functionality",
        "Privacy focused",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Mokku V2
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Written from scratch with improved UI and ease of use.
                        Experience the next generation of API mocking.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {benefits.map((benefit) => (
                            <Badge
                                key={benefit}
                                variant="secondary"
                                className="text-xs"
                            >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {benefit}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Migration Notice */}
                <Card className="mb-8 border-green-200 bg-green-50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-green-800">
                                    Your Data is Safe
                                </h3>
                                <p className="text-green-700 text-sm">
                                    We have created an offline organization and
                                    project for you where all your previous
                                    mocks exist.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Features Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Powerful Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        {faq.question}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {faq.answer}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Comparison Section */}
                <Card className="mb-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">
                            Choose Your Version
                        </CardTitle>
                        <p className="text-muted-foreground">
                            Both versions offer powerful mocking capabilities
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Local Version */}
                            <div className="space-y-4 p-6 rounded-lg border-2 border-blue-200 bg-blue-50">
                                <div className="flex items-center gap-2">
                                    <Database className="w-5 h-5 text-blue-600" />
                                    <h3 className="text-xl font-semibold text-blue-800">
                                        Local Version
                                    </h3>
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-100 text-blue-700 border-blue-300"
                                    >
                                        Recommended for Solo Work
                                    </Badge>
                                </div>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Data stays in your browser</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>No internet required</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Maximum privacy</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Free forever</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Cloud Version */}
                            <div className="space-y-4 p-6 rounded-lg border-2 border-purple-200 bg-purple-50">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-purple-600" />
                                    <h3 className="text-xl font-semibold text-purple-800">
                                        Cloud Version
                                    </h3>
                                    <Badge
                                        variant="outline"
                                        className="bg-purple-100 text-purple-700 border-purple-300"
                                    >
                                        Coming Soon
                                    </Badge>
                                </div>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-purple-600" />
                                        <span>Team collaboration</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-purple-600" />
                                        <span>Sync across devices</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-purple-600" />
                                        <span>Enterprise security</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-purple-600" />
                                        <span>Advanced features</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Get Started */}
                <Card className="text-center">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Your previous mocks have been automatically migrated
                            to the new project structure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                <Rocket className="w-4 h-4 mr-2" />
                                Explore Your Mocks
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button variant="outline" size="lg">
                                <Code className="w-4 h-4 mr-2" />
                                Create New Mock
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
