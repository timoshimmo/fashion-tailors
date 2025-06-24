'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight, Ruler, ShoppingBag, Settings, LogOut, User, Camera, Pencil, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Chioma Nwosu',
    email: 'chioma.n@example.com',
    avatar: 'https://placehold.co/100x100.png',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (avatarPreview) {
      setUser((prev) => ({ ...prev, avatar: avatarPreview }));
    }
    setIsEditing(false);
  };


  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <User className="w-8 h-8 text-accent" />
        <h1 className="font-headline text-3xl text-primary">Profile</h1>
      </header>

      <Card className="relative">
        <div className="absolute top-4 right-4">
          {isEditing ? (
            <Button onClick={handleSave} size="icon">
              <Save />
              <span className="sr-only">Save Changes</span>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil />
              <span className="sr-only">Edit Profile</span>
            </Button>
          )}
        </div>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarPreview || ''} alt="User avatar" data-ai-hint="woman portrait" />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <button 
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-6 h-6" />
                </button>
              )}
              <input 
                type="file" 
                ref={avatarInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={!isEditing}
              />
            </div>
            {isEditing ? (
              <div className="flex-1 space-y-2">
                <Input name="name" value={user.name} onChange={handleInputChange} className="text-2xl font-bold" />
                <Input name="email" type="email" value={user.email} onChange={handleInputChange} />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings and history.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <ProfileLinkItem icon={Ruler} label="My Measurements" href="/measure" />
          <ProfileLinkItem icon={ShoppingBag} label="Order History" href="/order-history" />
          <ProfileLinkItem icon={Camera} label="Try-On History" href="/try-on-history" />
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

function ProfileLinkItem({ icon: Icon, label, href }: { icon: React.ElementType; label: string; href?: string }) {
  const content = (
    <>
      <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 text-accent" />
        <span className="text-primary font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </>
  );

  const className = "flex items-center justify-between w-full p-4 text-left rounded-lg hover:bg-secondary/50 transition-colors";

  if (href) {
    return <Link href={href} className={className}>{content}</Link>;
  }
  
  return <button className={className}>{content}</button>;
}
