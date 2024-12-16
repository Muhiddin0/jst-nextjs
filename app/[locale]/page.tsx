import DocPage from "./_doc";

interface Props {
  params: {
    locale: string;
  };
}

export default async function Home({}: Props) {
  return <DocPage />;
}
