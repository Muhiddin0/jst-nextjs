import { format } from "date-fns";
import { ru, uz, enUS } from "date-fns/locale";
import { useParams } from "next/navigation";

interface DateTimeWriterProps {
  date: Date;
}

export const DateTimeWriter = ({ date }: DateTimeWriterProps) => {
  const { locale } = useParams();

  const localeObject = {
    uz: uz,
    ru: ru,
    en: enUS,
  };

  return (
    <time
      dateTime={date.toISOString()}
      className="text-sm text-muted-foreground"
    >
      {format(date, "d-MMMM-yyyy, HH:mm", {
        locale: localeObject[(locale as Lang) || uz],
      })}
    </time>
  );
};
