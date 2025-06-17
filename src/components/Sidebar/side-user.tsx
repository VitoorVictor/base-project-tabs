// "use client";

// import { Bolt, ChevronsUpDown, CircleHelp, KeyRound, Sparkles } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
// import ButtonLogout from "@/components/CustomButtons/button-logout";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ChangePasswordForm } from "../ChangePasswordForm/change-password-form";

// export function SideUser({ email }: { email: string }) {
//   const searchParams = useSearchParams();
//   const currentParams = new URLSearchParams(searchParams.toString());
//   const router = useRouter();
//   const showChangePassword = searchParams.get("changePassword") || "";
//   const trimmedName = email || "";

//   let Name;
//   const parts = trimmedName.split(" ");
//   if (parts.length >= 2) {
//     // Se houver pelo menos duas partes (nome e sobrenome)
//     Name = parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
//   } else {
//     // Se houver apenas uma parte (por exemplo, só um nome)
//     Name = parts[0].charAt(0).toUpperCase();
//   }

//   function getUsernameFromEmail(email: string): string {
//     const [username] = email.split("@");
//     return username;
//   }
//   const username = getUsernameFromEmail(email);
//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <div className="flex items-center gap-3 cursor-pointer">
//               <Avatar className="h-8 w-8 rounded-full">
//                 <AvatarImage
//                   src={`https://placehold.co/200x200/e2e8f0/4b4bbb/?text=${Name}`}
//                   alt={"Teste Nome"}
//                 />
//                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//               </Avatar>
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-semibold text-accent">
//                   {username}
//                 </span>
//                 <span className="truncate text-xs text-accent">{email}</span>
//               </div>
//               <ChevronsUpDown className="ml-auto size-4 text-accent" />
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-[--radix-dropdown-menu-trigger-width] min-w-58 rounded-lg"
//             side={"bottom"}
//             align="center"
//             sideOffset={4}
//           >
//             <DropdownMenuGroup>
//               <DropdownMenuItem
//                 onClick={() => {
//                   currentParams.set("changePassword", "true");
//                   router.push(`?${currentParams.toString()}`);
//                 }}
//               >
//                 <KeyRound />
//                 Alterar senha
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <ButtonLogout />
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//       {showChangePassword && (
//         <ChangePasswordForm
//           onClose={() => {
//             currentParams.delete("changePassword");
//             router.push(`?${currentParams.toString()}`);
//           }}
//         />
//       )}
//     </SidebarMenu>
//   );
// }
