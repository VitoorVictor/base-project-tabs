import Lottie from "react-lottie";
import animationDataError from "../../../public/lottiefiles/error.json";
import animationDataForbidden from "../../../public/lottiefiles/forbidden.json";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { IError } from "@/interfaces/comum";
import { Button } from "../ui/button";
import { useTabStore } from "@/store/tabStore";

interface CustomErrorProps {
  error: IError;
  onRefresh: () => void;
}

export function CustomError({ error, onRefresh }: CustomErrorProps) {
  const { setActiveKey } = useTabStore();
  const defaultOptionsCommon = {
    loop: false,
    autoplay: true,
    animationData: animationDataError,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptionsForbidden = {
    loop: false,
    autoplay: true,
    animationData: animationDataForbidden,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (error.statusCode !== 403) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4">
        <div className="overflow-hidden max-w-[300px] md:max-w-[540px] w-full flex items-center justify-between px-2 py-1 border-l-8 border-red-500 bg-red-300 rounded-md">
          <div className="flex-1">
            <p className="truncate text-base font-semibold max-w-[190px] md:max-w-[380px] lg:max-w-[420px]">
              {error?.message}
            </p>
            <p className="truncate text-base">
              Erro:{" "}
              <span className="font-semibold">
                {error?.error} - {error?.statusCode}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Lottie options={defaultOptionsCommon} width={100} />
          </div>
        </div>
        {/* <h1 className="font-semibold text-3xl">Oops! Falha no sistema</h1> */}
        <Separator className="max-w-[300px] md:max-w-[540px] my-2" />
        <p className="max-w-[300px] md:max-w-[540px] text-muted-foreground md:text-base text-sm">
          Parece que algo não está funcionando direito. Tente recarregar a
          página ou volte mais tarde. Se o problema persistir contate o
          administrador
        </p>
        <div className="mt-5 gap-2 md:gap-4 flex items-center justify-between">
          <button
            onClick={onRefresh}
            className="truncate inline-flex items-center rounded-md border border-primary px-4  py-2 md:text-sm text-xs font-medium bg-gray-100  text-primary shadow-sm transition-colors hover:bg-slate-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Recarregar página
          </button>
          <Button
            onClick={() => setActiveKey("dashboard")}
            className="truncate inline-flex items-center rounded-md bg-primary px-4 py-2 border border-primary md:text-sm text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-gray-100/90 hover:text-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Ir para a página principal
          </Button>
        </div>
      </div>
    );
  } else if (error.statusCode === 403) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background  sm:px-4 px-8">
        <div className="sm:max-w-xl max-w-md text-center">
          <div className="sm:flex gap-2 justify-center items-center hidden mb-5">
            <div className="flex flex-col">
              <div className="lg:block">
                <Lottie options={defaultOptionsForbidden} width={250} />
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-primary sm:text-4xl">
                Epa! Área restrita!
              </h1>
            </div>
          </div>

          <div className="sm:hidden block">
            <Lottie options={defaultOptionsForbidden} width={200} />
          </div>

          <h1 className="sm:hidden my-3 text-2xl font-bold tracking-tight text-primary">
            Epa! Área restrita!
          </h1>
          <Separator />

          <p className="mt-4 text-muted-foreground md:text-base text-sm">
            Ops! Parece que você não tem permissão para acessar esta página. Se
            acha que isso é um engano, entre em contato com o administrador.
          </p>
          <div className="mt-5">
            <Button
              onClick={() => setActiveKey("dashboard")}
              className="inline-flex items-center rounded-md bg-primary px-4  py-2 md:text-sm text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Voltar para a dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
