import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  GalleryVerticalEnd,
  LogOut,
  Sparkles,
  Terminal,
} from 'lucide-react';
import packageJson from 'package.json';

import { processRoutes, routes } from '@/router/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/animate-ui/components/radix/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shadcn/components/animate-ui/components/radix/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shadcn/components/animate-ui/primitives/radix/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar';

import styles from './style.module.less';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = useMemo(() => {
    return routes.children ? processRoutes(routes.children) : [];
  }, []);

  const handleTerminal = () => {
    window.ipcRenderer.invoke('funOpenDevTools', 'view');
  };

  return (
    <Sidebar className={styles.sideBar} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className={styles.menuButton}>
              <div className={styles.iconContainer}>
                <GalleryVerticalEnd className={styles.icon} />
              </div>
              <div className={styles.textContainer}>
                <span className={styles.titleText}>{packageJson.name}</span>
                <span className={styles.subtitleText}>{packageJson.version}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((item) => {
              if (item.items && item.items.length > 0) {
                const hasActiveChild = item.items.some(
                  (subItem) => location.pathname === subItem.url,
                );
                return (
                  <Collapsible key={item.title} asChild defaultOpen={hasActiveChild}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon}
                          <span>{item.title}</span>
                          <ChevronRight className={styles.chevronIcon} />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                onClick={() => navigate(subItem.url)}
                                isActive={location.pathname === subItem.url}
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={location.pathname === item.url}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup className={styles.collapsibleGroup}>
          <SidebarGroupLabel>Advanced</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleTerminal}>
                <Terminal />
                <span>Terminal</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className={styles.menuButton}>
                  <Avatar className={styles.avatar}>
                    <AvatarImage src="./logo.png" alt="TiltySola" />
                    <AvatarFallback className={styles.avatarFallback}>TS</AvatarFallback>
                  </Avatar>
                  <div className={styles.textContainer}>
                    <span className={styles.titleText}>TiltySola</span>
                    <span className={styles.subtitleText}>tiltysola@example.com</span>
                  </div>
                  <ChevronsUpDown className={styles.rightIcon} />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={styles.dropdownContent}
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className={styles.dropdownLabel}>
                  <div className={styles.dropdownItemContainer}>
                    <Avatar className={styles.avatar}>
                      <AvatarImage src="./logo.png" alt="TiltySola" />
                      <AvatarFallback className={styles.avatarFallback}>TS</AvatarFallback>
                    </Avatar>
                    <div className={styles.textContainer}>
                      <span className={styles.titleText}>TiltySola</span>
                      <span className={styles.subtitleText}>tiltysola@example.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Index;
