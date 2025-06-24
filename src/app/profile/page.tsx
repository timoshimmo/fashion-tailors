
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight, Ruler, ShoppingBag, Settings, LogOut, User } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <User className="w-8 h-8 text-accent" />
        <h1 className="font-headline text-3xl text-primary">Profile</h1>
      </header>

      <Card>
        <CardContent className="pt-6 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="woman portrait" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-primary">Chioma Nwosu</h2>
            <p className="text-muted-foreground">chioma.n@example.com</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings and history.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <ProfileLinkItem icon={Ruler} label="My Measurements" />
          <ProfileLinkItem icon={ShoppingBag} label="Order History" />
          <ProfileLinkItem icon={Settings} label="Settings" />
        </CardContent>
      </Card>
      
      <Button variant="destructive" className="w-full">
        <LogOut className="mr-2" />
        Log Out
      </Button>
    </div>
  );
}

function ProfileLinkItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="flex items-center justify-between w-full p-4 text-left rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 text-accent" />
        <span className="text-primary font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
