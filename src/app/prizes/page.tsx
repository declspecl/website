import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PrizesPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-24">
            <h1 className="text-4xl font-bold mb-12">Prizes</h1>
            <div className="flex flex-row space-x-8">
                {/* Low Tier Prizes */}
                <div className="w-96">
                    <Card>
                        <CardHeader>
                            <CardTitle>Low Tier</CardTitle>
                            <CardDescription>Prizes in this tier</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                <li>Polaroid Camera</li>
                                <li>Gift Card ($25)</li>
                                <li>Portable Bluetooth Speaker</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Mid Tier Prizes */}
                <div className="w-96">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mid Tier</CardTitle>
                            <CardDescription>Prizes in this tier</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                <li>Mini Fridge</li>
                                <li>Smart Watch</li>
                                <li>Noise Cancelling Headphones</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* High Tier Prizes */}
                <div className="w-96">
                    <Card>
                        <CardHeader>
                            <CardTitle>High Tier</CardTitle>
                            <CardDescription>Prizes in this tier</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                <li>Meta Quest VR Headset</li>
                                <li>Gaming Console</li>
                                <li>High-End Laptop</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
