import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function PromoCard() {
    return (
        <Card className="bg-primary text-primary-foreground shadow-lg">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="font-headline text-lg">Hi Tomiwa!</h3>
                    <p className="text-sm text-primary-foreground/80">Prom is around the corner! find the perfect dress.</p>
                    <div className="flex items-center gap-2 pt-1">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">98 Days Left!</span>
                    </div>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                    Start My Prom Design
                </Button>
            </CardContent>
        </Card>
    )
}
