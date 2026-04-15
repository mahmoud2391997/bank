import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  UserCircle,
  ShieldCheck,
  Briefcase,
  Wallet,
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/src/lib/auth-context';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, active }) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
      active 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    )}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </Link>
);

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, isAdmin, impersonatedUser, setImpersonatedUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStopImpersonation = () => {
    setImpersonatedUser(null);
    toast.success('Returned to admin view');
    navigate('/admin/customers');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Wallet, label: 'Accounts', href: '/accounts' },
    { icon: ArrowRightLeft, label: 'Transfers', href: '/transfers' },
    { icon: Briefcase, label: 'Instruments', href: '/instruments' },
    { icon: FileText, label: 'Statements', href: '/statements' },
    { icon: UserCircle, label: 'Profile', href: '/profile' },
  ];

  const adminItems = [
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: ShieldCheck, label: 'KYC Requests', href: '/admin/kyc' },
    { icon: CreditCard, label: 'Manage Instruments', href: '/admin/instruments' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">P</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">PROMINENCE</span>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 font-semibold">Core Banking Platform</p>
      </div>

      <div className="flex-1 px-4 space-y-1">
        <p className="px-4 text-[10px] font-bold uppercase text-muted-foreground mb-2">Main Menu</p>
        {navItems.map((item) => (
          <SidebarItem 
            key={item.href} 
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={location.pathname === item.href} 
          />
        ))}

        {isAdmin && !impersonatedUser && (
          <>
            <Separator className="my-4 mx-4" />
            <p className="px-4 text-[10px] font-bold uppercase text-muted-foreground mb-2">Administration</p>
            {adminItems.map((item) => (
              <SidebarItem 
                key={item.href} 
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href} 
              />
            ))}
          </>
        )}
      </div>

      <div className="px-4 mt-auto">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  const currentUser = impersonatedUser || profile;

  return (
    <div className="flex h-screen bg-background overflow-hidden flex-col">
      {impersonatedUser && (
        <div className="bg-orange-600 text-white px-6 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Impersonation Mode: Viewing as <strong>{impersonatedUser.name}</strong></span>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="h-7 text-xs"
            onClick={handleStopImpersonation}
          >
            Exit Impersonation
          </Button>
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-card">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              <h1 className="text-lg font-semibold capitalize">
                {location.pathname === '/' ? 'Overview' : location.pathname.split('/').pop()?.replace('-', ' ')}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{currentUser?.displayName || currentUser?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
              </div>
              <Avatar>
                <AvatarImage src={currentUser?.photoURL} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {(currentUser?.displayName || currentUser?.name)?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
