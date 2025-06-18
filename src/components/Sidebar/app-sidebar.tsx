"use client";

import * as React from "react";

import { SideMain } from "./side-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SideLogo } from "./side-logo";
import {
  CircleDollarSign,
  ClipboardList,
  FilePlus2,
  HandCoins,
  LayoutDashboard,
  Package,
  PackageOpen,
  ScrollText,
  UserRoundPlus,
  ShieldPlus,
} from "lucide-react";
import { DashboardContent } from "../Pages/Dashboard/dashboard-pages";
import { CentroCustosContent } from "../Pages/CentroCusto/pages";
import { MarcaPage } from "../Pages/Marca/pages";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;
// & {
//   session: Session | null;
// };

export function AppSidebar({ ...props }: AppSidebarProps) {
  const data = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      key: "dashboard",
      component: DashboardContent,
    },
    {
      title: "Cadastro",
      icon: FilePlus2,
      items: [
        {
          title: "Financeiro",
          icon: HandCoins,
          items: [
            {
              title: "Tipo de Rec./Pag.",
              key: "recpag-documento-tipos",
              permission: "recpag_documento_tipos_findAll",
              component: CentroCustosContent,
            },
            {
              icon: HandCoins,
              title: "Centros de Custos",
              key: "centro-custos",
              permission: "centro_custos_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Classificações de Rec./Pag.",
              key: "recpag-classificacoes",
              permission: "recpag_classificacoes_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Contas Correntes/Caixa",
              key: "contas",
              permission: "contas_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Formas de Pagamentos",
              key: "formas-pagamentos",
              permission: "contas_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Plano de Contas",
              key: "plano-contas",
              permission: "plano_contas_findAll",
              component: CentroCustosContent,
            },
          ],
        },
        {
          title: "Pessoas",
          icon: UserRoundPlus,
          items: [
            {
              title: "Clientes e Fornecedores",
              key: "pessoas",
              permission: "pessoas_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Estados Civis",
              key: "estado-civis",
              permission: "estado_civis_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Grupos de pessoas",
              key: "pessoa-grupos",
              permission: "pessoa_grupos_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Origens",
              key: "pessoa-origens",
              permission: "pessoa_origens_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Situações",
              key: "pessoa-situacoes",
              permission: "pessoa_situacoes_findAll",
              component: CentroCustosContent,
            },
            {
              title: "Tipos de Contatos",
              key: "pessoa-tipo-contatos",
              permission: "pessoa_tipo_contatos_findAll",
            },
            {
              title: "Tipos de Endereços",
              key: "pessoa-tipo-enderecos",
              permission: "pessoa_tipo_enderecos_findAll",
            },
          ],
        },
        {
          title: "Produtos",
          icon: Package,
          items: [
            {
              title: "Grupos",
              key: "grupos",
              permission: "grupos_findAll",
            },
            {
              icon: Package,
              title: "Marcas",
              key: "marcas",
              permission: "marcas_findAll",
              component: MarcaPage,
            },
          ],
        },
      ],
    },
    {
      title: "Movimentação",
      icon: PackageOpen,
      items: [
        {
          title: "Orçamento",
          key: "#",
        },
        {
          title: "Vendas",
          key: "#",
        },
        {
          title: "Devoluções",
          key: "#",
        },
      ],
    },
    {
      title: "Financeiro",
      icon: CircleDollarSign,
      items: [
        {
          title: "Contas a pagar",
          key: "contas-pagar",
          permission: "contas_pagar_findAll",
        },
        {
          title: "Pagamentos",
          key: "pagamentos",
          permission: "pagamentos_findAll",
        },
        {
          title: "Contas a receber",
          key: "contas-receber",
          permission: "contas_receber_findAll",
        },
        {
          title: "Resumo financeiro",
          key: "#",
        },
      ],
    },
    {
      title: "Ordem de serviço",
      icon: ClipboardList,
      items: [
        {
          title: "Ordem de serviço",
          key: "#",
        },
        {
          title: "Consulta rápida",
          key: "#",
        },
        {
          title: "Boqueta",
          key: "#",
        },
      ],
    },
    {
      title: "Relatório",
      icon: ScrollText,
      items: [
        {
          title: "Cadastro",
          key: "#",
        },
        {
          title: "Movimentação",
          key: "#",
        },
        {
          title: "Financeiro",
          key: "#",
        },
      ],
    },
    {
      title: "Nível de Segurança",
      icon: ShieldPlus,
      key: "nivel-seguranca",
    },
  ];
  return (
    <Sidebar collapsible="icon" {...props} className="relative">
      <SidebarHeader className="bg-primary py-0 my-0 flex items-center justify-center w-full">
        <SideLogo />
      </SidebarHeader>
      <SidebarContent className="custom-scrollbar bg-primary">
        <SideMain items={data} />
      </SidebarContent>
      {/* <SidebarFooter className="bg-primary">
        <SideUser email={"c3po@yodacrops.com.br"} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
