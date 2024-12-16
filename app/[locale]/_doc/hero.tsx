import { ArrowRight, GitMerge, Globe, Key, Layout, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeHighLight from "@/components/code-high-light/code-high-light";
import Image from "next/image";

import AnimationBgImage from "./public/aimation-background.gif";

export default function DocsPage() {
  const services = [
    {
      title: "API Optimizatsiya",
      description: "Requestlarni kechlash va tokenlarni avtomatik boshqarish",
      icon: Zap,
      features: [
        "API requestlarni kechlash",
        "Avtomatik token yangilash",
        "Xavfsiz autentifikatsiya",
      ],
    },
    {
      title: "Xavfsizlik",
      description: "2FA va avtomatik logout funksiyalari",
      icon: Key,
      features: [
        "Ikki faktorli autentifikatsiya",
        "Avtomatik logout",
        "Xavfsiz sessiya boshqaruvi",
      ],
    },
    {
      title: "Ko'p tillilik",
      description: "i18n qo'llab-quvvatlash",
      icon: Globe,
      features: [
        "Avtomatik til aniqlash",
        "Ko'p tillarni qo'llab-quvvatlash",
        "Tizim tiliga moslashuv",
      ],
    },
    {
      title: "Interfeys Tezligi",
      description:
        "Zamonaviy UI/UX elementlari va optimallashtirilgan komponentlar",
      icon: Layout,
      features: [
        "Modul asosida UI komponentlari",
        "Light/Dark mode qo'llab-quvvatlash",
        "Resurslarni optimallashtirish",
      ],
    },
    {
      title: "Xabarlar va Eventlar",
      description: "Real-vaqtda xabarlarni boshqarish va kuzatish",
      icon: ArrowRight,
      features: [
        "Real-time xabar yetkazish",
        "Event kuzatuv tizimi",
        "WebSocket qo'llab-quvvatlash",
      ],
    },
  ];

  return (
    <div className=" bg-gradient-to-b from-background to-background/80">
      <div className="relative">
        <div className="flex items-center justify-center absolute inset-0 bg-gradient-to-b from-violet-500/30 via-purple-500/20 to-background blur-3xl"></div>
        <div className="container relative">
          <div className="flex relative min-h-screen flex-col justify-center items-center text-center">
            <Image
              className="mix-blend-lighten absolute top-0 left-0 w-full h-full object-contain z-[0]"
              src={AnimationBgImage}
              alt="Animation bg image"
            />

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              JST-NEXTJS
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl">
              Frontend ishlab chiqishni tezlashtirish va zamonaviy,
              optimallashtirilgan dasturiy yechimlarni yaratish uchun shablon
            </p>
            <div className="relative z-10 mt-10 flex items-center justify-center gap-4">
              <Button>
                Boshlash
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                GitLab
                <GitMerge className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>
                    <div className="flex gap-3 items-center">
                      <service.icon
                        size={24}
                        className="h-5 w-5 text-violet-500"
                      />
                      {service.title}
                    </div>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 text-sm text-muted-foreground">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex gap-3 items-center">
                    <Layout className="h-5 w-5 text-violet-500" />
                    Foydalanishni boshlash
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeHighLight lang="js">
                  npx create-next-app@latest jst-nextjs --example
                  &quot;https://github.com/Muhiddin0/jst-nextjs.git&quot;
                </CodeHighLight>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
