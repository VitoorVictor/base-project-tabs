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
import { CentroCustosPage } from "../Pages/CentroCustos/pages";
import { MarcaPage } from "../Pages/Marcas/pages";
import { GrupoPage } from "../Pages/Grupos/pages";
import { EstadoCivilPage } from "../Pages/EstadoCivis/pages";
import { PessoaOrigemPage } from "../Pages/PessoaOrigens/pages";
import { ContaPage } from "../Pages/Contas/pages";
import { PessoaSituacaoPage } from "../Pages/PessoaSituacoes/pages";
import { PessoaTipoContatoPage } from "../Pages/PessoaTipoContatos/pages";
import { PessoaTipoEnderecoPage } from "../Pages/PessoaTipoEnderecos/pages";

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
              component: CentroCustosPage,
            },
            {
              icon: HandCoins,
              title: "Centros de Custos",
              key: "centro-custos",
              permission: "centro_custos_findAll",
              component: CentroCustosPage,
            },
            {
              title: "Classificações de Rec./Pag.",
              key: "recpag-classificacoes",
              permission: "recpag_classificacoes_findAll",
              component: CentroCustosPage,
            },
            {
              icon: HandCoins,
              title: "Contas Correntes/Caixa",
              key: "contas",
              permission: "contas_findAll",
              component: ContaPage,
            },
            {
              title: "Formas de Pagamentos",
              key: "formas-pagamentos",
              permission: "contas_findAll",
              component: CentroCustosPage,
            },
            {
              title: "Plano de Contas",
              key: "plano-contas",
              permission: "plano_contas_findAll",
              component: CentroCustosPage,
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
              component: CentroCustosPage,
            },
            {
              title: "Estados Civis",
              key: "estado-civis",
              permission: "estado_civis_findAll",
              component: EstadoCivilPage,
            },
            {
              title: "Grupos de pessoas",
              key: "pessoa-grupos",
              permission: "pessoa_grupos_findAll",
              component: CentroCustosPage,
            },
            {
              icon: UserRoundPlus,
              title: "Origens",
              key: "pessoa-origens",
              permission: "pessoa_origens_findAll",
              component: PessoaOrigemPage,
            },
            {
              icon: UserRoundPlus,
              title: "Situações",
              key: "pessoa-situacoes",
              permission: "pessoa_situacoes_findAll",
              component: PessoaSituacaoPage,
            },
            {
              icon: UserRoundPlus,
              title: "Tipos de Contatos",
              key: "pessoa-tipo-contatos",
              permission: "pessoa_tipo_contatos_findAll",
              component: PessoaTipoContatoPage,
            },
            {
              icon: UserRoundPlus,
              title: "Tipos de Endereços",
              key: "pessoa-tipo-enderecos",
              permission: "pessoa_tipo_enderecos_findAll",
              component: PessoaTipoEnderecoPage,
            },
          ],
        },
        {
          title: "Produtos",
          icon: Package,
          items: [
            {
              icon: Package,
              title: "Grupos",
              key: "grupos",
              permission: "grupos_findAll",
              component: GrupoPage,
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
