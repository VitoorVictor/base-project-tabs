"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { loginAction } from "@/actions/auth";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CustomInput } from "../CustomInputs/custom-input";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const [captchaAnswer, setCaptchaAnswer] = useState("");

  // Captcha simples - números aleatórios
  //   const [captcha] = useState(() => {
  //     const num1 = Math.floor(Math.random() * 10) + 1;
  //     const num2 = Math.floor(Math.random() * 10) + 1;
  //     return { num1, num2, answer: num1 + num2 };
  //   });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Criar FormData para o Server Action
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await loginAction(formData);
      if (res) {
        router.push("/");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Credenciais inválidas"
      );
      form.setValue("password", "");
    } finally {
      setIsLoading(false);
    }
  };

  const carouselImages = [
    {
      src: "/bg-1.png",
      title: "Bem-vindo ao nosso sistema",
      description: "Gerencie sua empresa de forma eficiente e colaborativa",
    },
    {
      src: "/bg-2.png",
      title: "Segurança em primeiro lugar",
      description:
        "Seus dados protegidos com a mais alta tecnologia de segurança",
    },
    {
      src: "/bg-3.png",
      title: "Acesse de qualquer lugar",
      description:
        "Plataforma responsiva que funciona em todos os dispositivos",
    },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Carousel Section - Left */}
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center p-0 h-screen">
        <Carousel
          className="w-full h-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
        >
          <CarouselContent className="h-full">
            {carouselImages.map((item, index) => (
              <CarouselItem key={index} className="h-full p-0">
                <div className="relative w-full h-full">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay com texto */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                    <div className="text-white space-y-4">
                      <h2 className="text-3xl font-bold">{item.title}</h2>
                      <p className="text-lg text-gray-200">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-20" />
          <CarouselNext className="mr-20" />
        </Carousel>
      </div>

      {/* Login Form - Right */}
      <div className="flex items-center justify-center  bg-gradient-to-br from-blue-600/5 to-purple-700/5 p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Entrar
            </CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <CustomInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Digite seu email"
                />

                <CustomInput
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                />

                <div className="flex items-center justify-between">
                  <Link
                    href="/resetar-senha"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueci minha senha
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
