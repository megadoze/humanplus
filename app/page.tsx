"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

const typedText = "до 40%";

function Equalizer({ muted }: { muted: boolean }) {
  return (
    <div className="absolute top-4 right-4 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur pointer-events-none">
      <div className="flex items-end gap-[2px] h-5">
        {[0, 120, 240, 80].map((delay) => (
          <span
            key={delay}
            className={`eq-bar ${muted ? "eq-muted" : ""}`}
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [node]);

  return (
    <div
      ref={setNode}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function VideoOnView({
  src,
  className = "",
  preload = "none",
}: {
  src: string;
  className?: string;
  label?: string;
  preload?: "none" | "metadata" | "auto";
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setVisible(inView);

        if (inView) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [node]);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={setNode}
      onClick={toggleSound}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
          visible ? "opacity-90 scale-100" : "opacity-0 scale-105"
        }`}
        muted={muted}
        loop
        playsInline
        preload={preload}
        src={src}
      />

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.05))]" />

      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00ff8c]/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[#00ff8c]/10 blur-3xl pointer-events-none" />

      <Equalizer muted={muted || !visible} />
    </div>
  );
}

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setText(typedText.slice(0, i + 1));
        i++;

        if (i >= typedText.length) {
          clearInterval(interval);
        }
      }, 55);
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <section className="relative min-h-[92svh] md:min-h-screen px-6 md:px-16 py-8">
        <div className="absolute inset-0">
          <img
            src="/images/suitx.avif"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.9)_0%,rgba(5,5,5,0.55)_45%,rgba(5,5,5,0.25)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(0,255,140,0.18),transparent_36%)]" />
        </div>

        <nav className="relative z-10 flex items-center justify-center md:justify-normal animate-fade-down">
          <div className="text-3xl font-black tracking-tight">
            Human<span className="text-[#00ff8c] pl-0.5">+</span>
          </div>
        </nav>

        <div className="relative z-10 grid lg:grid-cols-[minmax(0,1fr)_460px] xl:grid-cols-[minmax(0,1fr)_500px] gap-12 items-center pt-20 md:pt-28">
          <div className="min-w-0 text-center md:text-left">
            <p className="animate-fade-up text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
              Exoskeleton Solutions
            </p>

            <h1 className="mt-6 text-[clamp(1.8rem,10vw,3rem)] md:text-6xl xl:text-6xl 2xl:text-7xl font-black leading-[1.1] xl:leading-[0.95] tracking-[-0.04em]">
              <span className="block animate-fade-up">
                Увеличьте эффективность команды
              </span>

              <span className="block min-h-[2.1em] md:min-h-[1.1em]">
                <span className="typing-line pb-2">
                  {text}
                  <span className="typing-cursor" />
                </span>
              </span>
            </h1>

            <p
              className="mt-6 text-lg md:text-3xl font-bold text-white animate-fade-up"
              style={{ animationDelay: "250ms" }}
            >
              Больше силы. Меньше боли.
            </p>

            <p
              className="mt-6 max-w-2xl md:text-lg md:text-xl text-white/55 leading-relaxed animate-fade-up"
              style={{ animationDelay: "350ms" }}
            >
              Экзоскелеты Human+ усиливают сотрудников в реальной работе:
              команда дольше держит темп, выполняет больше задач и снижает
              потери без изменения процессов.
            </p>

            <div
              className="mt-10 flex justify-center md:justify-normal flex-wrap gap-4 animate-fade-up text-sm md:text-base"
              style={{ animationDelay: "450ms" }}
            >
              <a
                href="#test"
                className="rounded-full bg-[#00ff8c] text-black px-7 py-4 md:font-black hover:scale-105 transition"
              >
                Запустить тест без риска
              </a>

              <a
                href="#how"
                className="rounded-full border border-white/15 px-7 py-4 md:font-black hover:bg-white hover:text-black transition duration-400 ease-in-out"
              >
                Как это работает
              </a>
            </div>
          </div>

          <VideoOnView
            src="/videos/suitx2.mp4"
            preload="metadata"
            className="flex w-full min-h-[460px] rounded-[36px] border border-white/10 shadow-[0_0_120px_rgba(0,255,140,0.12)] animate-float"
          />
        </div>
      </section>

      <Reveal>
        <section className="grid md:grid-cols-3 border-y border-white/10">
          {[
            ["до 40%", "рост эффективности"],
            ["1 неделя", "тест без риска"],
            ["0", "остановки процессов"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 text-center flex flex-col items-center justify-center"
            >
              <strong className="block text-4xl md:text-5xl font-black text-[#00ff8c]">
                {number}
              </strong>
              <span className="mt-2 text-white/55 text-sm md:text-base">
                {label}
              </span>
            </div>
          ))}
        </section>
      </Reveal>

      <section className="px-6 md:px-16 py-28 text-center md:text-left">
        <Reveal>
          <p className="text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
            Business impact
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl md:text-6xl font-black md:leading-[0.95] tracking-[-0.04em]">
            Ваша команда может делать больше <br />
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {[
            [
              "Темп",
              "К концу смены скорость падает, задачи занимают больше времени, а команда теряет производительность.",
            ],
            [
              "Потери",
              "Простои, больничные, текучка и перегрузка сотрудников напрямую съедают маржу.",
            ],
            [
              "ROI",
              "Даже небольшой прирост эффективности команды быстро превращается в измеримый экономический эффект.",
            ],
          ].map(([title, body], index) => (
            <Reveal key={title} delay={index * 120}>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:-translate-y-2 hover:border-[#00ff8c]/40 transition">
                <h3 className="text-xl md:text-2xl md:font-bold">{title}</h3>
                <p className="mt-4 text-white/55 leading-relaxed text-sm md:text-base">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center px-6 md:px-16 py-28 bg-white/[0.03] text-center md:text-left">
        <Reveal>
          <p className="text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
            Solution
          </p>

          <h2 className="mt-4 text-3xl md:text-6xl font-black md:leading-[0.95] tracking-[-0.04em]">
            Усиливаем сотрудников, <br />
            <span>чтобы бизнес делал больше</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="md:text-xl text-white/60 leading-relaxed">
            Human+ добавляет физическую поддержку там, где бизнес теряет
            скорость: склад, производство, логистика, строительство. Демо, тест,
            обучение и поддержка — в одной понятной модели.
          </p>
        </Reveal>
      </section>

      <section className="px-6 md:px-16 py-28 border-y border-white/10 bg-white/[0.025] text-center md:text-left">
        <Reveal>
          <p className="text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
            Demo
          </p>
        </Reveal>

        <div className="mt-4 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <Reveal>
            <VideoOnView
              src="/videos/man.mp4"
              label="Видео демонстрации"
              className="min-h-[420px] rounded-[36px] border border-white/10 bg-[#101010] shadow-[0_0_120px_rgba(0,255,140,0.08)]"
            />
          </Reveal>

          <Reveal delay={160}>
            <div>
              <h2 className="text-3xl md:text-6xl font-black md:leading-[0.95] tracking-[-0.04em]">
                Проверьте эффект
                <br />
                на реальной задаче
              </h2>

              <p className="mt-6 md:text-xl text-white/60 leading-relaxed">
                Экзоскелет проверяется не в презентации, а в вашей операционной
                среде: подъём, перенос, удержание рук, повторяющиеся движения и
                работа в темпе.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  ["Без", "темп быстрее падает из-за нагрузки"],
                  [
                    "С Human+",
                    "сотрудник дольше сохраняет силу и стабильность",
                  ],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <p className="text-[#00ff8c] font-black">{title}</p>
                    <p className="mt-1 text-white/60 text-sm md:text-base">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="how"
        className="px-6 md:px-16 py-28 text-center md:text-left"
      >
        <Reveal>
          <p className="text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
            Process
          </p>

          <h2 className="mt-4 text-3xl md:text-6xl font-black tracking-[-0.04em]">
            Как это работает
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {[
            [
              "01",
              "Демо",
              "Показываем, где экзоскелет может дать прирост в вашей операции.",
            ],
            [
              "02",
              "Тест",
              "Команда пробует Human+ 1 неделю в реальной рабочей среде.",
            ],
            [
              "03",
              "Решение",
              "Вы оцениваете эффект по темпу, принятию, потерям и экономике.",
            ],
          ].map(([num, title, body], index) => (
            <Reveal key={num} delay={index * 120}>
              <div className="rounded-[28px] border border-white/10 bg-[#101010] p-8 hover:bg-[#151515] transition">
                <span className="block mb-10 text-[#00ff8c] text-xl font-black">
                  {num}
                </span>
                <h3 className="text-xl md:text-2xl md:font-bold">{title}</h3>
                <p className="mt-4 text-white/55 leading-relaxed text-sm md:text-base">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-28 bg-white/[0.025] border-y border-white/10 text-center md:text-left">
        <div className="mt-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <Reveal>
            <div>
              <p className="text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
                Proof
              </p>

              <h2 className="mt-4 text-3xl md:text-6xl font-black md:leading-[0.95] tracking-[-0.04em]">
                Эффект видно
                <br />в операциях
              </h2>

              <p className="mt-6 md:text-xl text-white/60 leading-relaxed">
                Сотрудник надевает экзоскелет и выполняет привычную задачу — а
                вы сразу видите, где появляется больше стабильности, темпа и
                контроля.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {[
              [
                "Больше стабильности",
                "Поддержка помогает сотруднику дольше сохранять рабочий темп на повторяющихся задачах.",
              ],
              [
                "Быстрее принятие",
                "Команда понимает пользу через собственный опыт, а не через презентацию.",
              ],
              [
                "Без перестройки процессов",
                "Решение внедряется поверх текущей работы: склад, стройка, производство или логистика.",
              ],
            ].map(([title, body], index) => (
              <Reveal key={title} delay={index * 120}>
                <div className="rounded-[28px] border border-white/10 bg-[#101010] p-8 hover:border-[#00ff8c]/40 transition">
                  <h3 className="text-xl md:text-2xl font-black">{title}</h3>
                  <p className="mt-4 text-white/55 leading-relaxed text-sm md:text-base">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-28 text-center md:text-left">
        <div className="mt-4 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div>
              <p className="text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
                Business case
              </p>

              <h2 className="mt-4 text-3xl md:text-6xl font-black md:leading-[0.95] tracking-[-0.04em]">
                Та же команда —
                <br />
                <span>больше результата</span>
              </h2>

              <p className="mt-6 md:text-xl text-white/60 leading-relaxed">
                Human+ усиливает сотрудников там, где бизнес теряет скорость:
                команда дольше держит темп, выполняет больше задач и даёт
                стабильный результат в течение всей смены.
              </p>

              <p className="mt-4 text-sm md:text-lg text-white/50 leading-relaxed">
                Запустите тест и посмотрите, как это влияет на объём работы,
                скорость выполнения и экономику смены.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[36px] md:border border-white/10 bg-white/[0.04] md:p-8 md:p-10 shadow-[0_0_100px_rgba(0,255,140,0.08)]">
              <div className="grid gap-5">
                {[
                  ["01", "Больше задач за смену"],
                  ["02", "Стабильный темп до конца дня"],
                  ["03", "Меньше простоев и срывов"],
                  ["04", "Быстрая окупаемость"],
                ].map(([num, item]) => (
                  <div
                    key={num}
                    className="flex items-center gap-5 rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#00ff8c] text-sm font-black text-black">
                      {num}
                    </span>
                    <p className="md:text-lg md:font-bold text-white/85 text-left">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl bg-[#00ff8c] p-6 text-black">
                <p className="text-sm font-mono uppercase tracking-[0.18em]">
                  Без риска
                </p>
                <p className="mt-3 text-lg md:text-2xl leading-tight">
                  Сначала тест — потом масштабирование.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 md:px-16 py-28 bg-white/[0.025] border-y border-white/10 text-center md:text-left">
        <div className="mt-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <Reveal>
            <div>
              <p className="text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
                Economics
              </p>

              <h2 className="mt-4 text-3xl md:text-6xl font-black md:leading-[0.95] tracking-[-0.04em]">
                Сколько стоит
                <br />
                потерянный темп?
              </h2>

              <p className="mt-6 md:text-xl text-white/60 leading-relaxed">
                Что если небольшая доплата к часу работы помогает команде дольше
                сохранять производительность и снижает операционные потери?
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[36px] md:border border-white/10 bg-white/[0.04] md:p-8 md:p-10 shadow-[0_0_100px_rgba(0,255,140,0.08)]">
              <div className="grid gap-4">
                {[
                  ["+1€ / час", "условная стоимость усиления сотрудника"],
                  ["+ темп", "команда дольше сохраняет скорость работы"],
                  ["− потери", "меньше простоев, перегрузки и больничных"],
                ].map(([num, item]) => (
                  <div
                    key={num}
                    className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <p className="text-base md:text-2xl font-black text-[#00ff8c]">
                      {num}
                    </p>
                    <p className="max-w-[260px] text-right text-white/60 text-sm md:text-base flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl bg-[#00ff8c] p-6 text-black">
                <p className="text-sm font-mono uppercase tracking-[0.18em]">
                  Простая логика
                </p>
                <p className="mt-3 text-base md:text-2xl leading-tight">
                  Не спорьте с гипотезами. Протестируйте Human+ на своей команде
                  и посмотрите, где появляется реальный ROI.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 border-t border-white/10 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-6xl font-black">
            Прозрачная модель без капитальных вложений
          </h2>

          <p className="mt-6 md:text-xl text-white/60 max-w-2xl mx-auto">
            Вы не покупаете оборудование сразу. Human+ сначала проверяется в
            работе, а затем масштабируется по модели аренды.
          </p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            ["Тест", "Бесплатно", "1 неделя"],
            ["После теста", "от 300€/мес", "за устройство"],
            ["Включено", "Сервис", "ремонт / замена"],
          ].map(([label, price, note], index) => (
            <Reveal key={label} delay={index * 120}>
              <div className="rounded-2xl border border-white/10 p-6">
                <p className="text-sm text-white/50">{label}</p>
                <p className="mt-2 text-lg md:text-4xl font-black">{price}</p>
                <p className="mt-2 text-white/50">{note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <p className="mt-6 text-sm text-white/40 text-center">
            В среднем дешевле, чем потерянный рабочий день команды
          </p>
        </Reveal>
      </section>

      <section className="md:px-16 py-24 text-center md:text-left">
        <Reveal>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center rounded-[36px] md:border border-white/10 bg-white/[0.03] p-8 md:p-12 overflow-hidden relative">
            <div className="hidden md:absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00ff8c]/15 blur-3xl" />

            <div className="relative">
              <p className="text-[#00ff8c] uppercase tracking-[0.25em] text-xs font-black">
                7-day result
              </p>

              <h2 className="mt-4 text-3xl md:text-6xl font-black md:leading-[0.95] tracking-[-0.04em]">
                Что покажет тест
                <br />
                за 7 дней
              </h2>

              <p className="mt-6 md:text-xl text-white/60 leading-relaxed">
                Тест показывает не обещания, а бизнес-сигналы: где растёт темп,
                как команда принимает экзоскелет и есть ли смысл масштабировать.
              </p>
            </div>

            <div className="relative grid gap-4">
              {[
                [
                  "01",
                  "Где теряется скорость",
                  "Какие задачи забирают больше всего сил и времени",
                ],
                [
                  "02",
                  "Как реагирует команда",
                  "Комфорт, принятие и готовность использовать в смене",
                ],
                [
                  "03",
                  "Есть ли бизнес-эффект",
                  "Темп, стабильность, снижение нагрузки и потенциал ROI",
                ],
              ].map(([num, title, body]) => (
                <div
                  key={num}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#00ff8c] text-sm font-black text-black">
                      {num}
                    </span>

                    <div className="text-left">
                      <h3 className="md:text-xl font-black text-white">
                        {title}
                      </h3>
                      <p className="mt-1 text-white/55 text-sm text-base">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-6 md:px-16 py-24 border-t border-white/10">
        <Reveal>
          <div className="max-w-5xl mx-auto rounded-[36px] border border-white/10 bg-white/[0.03] p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00ff8c]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00ff8c]/10 blur-3xl" />

            <div className="relative text-center">
              <p className="text-white/40 text-sm uppercase tracking-[0.25em] font-bold">
                Уже тестируют
              </p>

              <div className="mt-8 flex justify-center flex-wrap gap-8 md:gap-12 text-lg md:text-xl font-semibold text-white/70">
                <span>Logistics Co</span>
                <span>Warehouse Group</span>
                <span>Manufacturing Ltd</span>
              </div>

              <p className="mt-8 text-sm text-white/40">
                Компании из логистики, производства и складской инфраструктуры
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="test"
        className="mx-6 md:mx-16 mb-20 rounded-[36px] bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,140,0.22),transparent_30%),#111] px-6 py-16 md:p-20 text-center"
      >
        <Reveal>
          <h2 className="text-3xl md:text-6xl font-black tracking-[-0.04em]">
            Проверьте Human+ на своей команде
          </h2>

          <p className="mt-6 md:text-xl text-white/60">
            1 неделя теста в реальной работе. Без покупки. Без риска. С фокусом
            на эффективность и ROI.
          </p>

          <a
            href="mailto:hello@humanplus.work"
            className="mt-10 inline-block rounded-full bg-[#00ff8c] text-black text-sm md:text-base px-7 py-4 md:font-black hover:scale-105 transition"
          >
            Запустить тест
          </a>
        </Reveal>
      </section>
    </main>
  );
}
