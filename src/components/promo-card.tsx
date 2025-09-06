import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function PromoCard() {
    return (
        <Card className="bg-primary text-primary-foreground shadow-lg rounded-2xl border border-accent/50">
            <CardContent className="p-4 flex flex-col gap-4">
                <div className="space-y-1">
                    <h3 className="font-headline text-lg">Hi Tomiwa!</h3>
                    <p className="text-sm text-primary-foreground/80">Prom is around the corner! find the perfect dress.</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">98 Days Left!</span>
                    </div>
                    <Button className="bg-[linear-gradient(to_bottom,#E6C66E,#B48A34)] text-accent-foreground hover:opacity-90 shrink-0">
                        Start My Prom Design
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
