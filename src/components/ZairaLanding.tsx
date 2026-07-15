"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";

type Service = {
  name: string;
  cat: string;
  desc: string;
};

const SERVICES: Service[] = [
  {
    name: "Faciales",
    cat: "Rostro",
    desc: "Limpiezas e hidrataciones que devuelven luz y frescura a tu piel.",
  },
  {
    name: "Masajes corporales",
    cat: "Cuerpo",
    desc: "Relajación profunda y descontracturante, de la cabeza a los pies.",
  },
  {
    name: "Aparatología",
    cat: "Cuerpo",
    desc: "Tecnología avanzada para tonificar, reafirmar y modelar tu figura.",
  },
  {
    name: "Uñas",
    cat: "Manos",
    desc: "Manicura y diseño con acabado impecable y de larga duración.",
  },
  {
    name: "Pedicura",
    cat: "Pies",
    desc: "Cuidado completo de tus pies, suave, reparador y relajante.",
  },
  {
    name: "Depilación",
    cat: "Cuerpo",
    desc: "Piel libre y sedosa con técnicas precisas de cera e hilo.",
  },
  {
    name: "Micropigmentación",
    cat: "Mirada",
    desc: "Realza cejas y labios con un trazo natural, definido y duradero.",
  },
  {
    name: "Pestañas 1x1",
    cat: "Mirada",
    desc: "Volumen y largo pelo a pelo para una mirada elevada y natural.",
  },
  {
    name: "Lashlifting",
    cat: "Mirada",
    desc: "Curva y eleva tus pestañas naturales, sin extensiones.",
  },
  {
    name: "Laminado de cejas",
    cat: "Mirada",
    desc: "Cejas peinadas, definidas y con una forma perfecta.",
  },
  {
    name: "Henna",
    cat: "Mirada",
    desc: "Diseño y tinte de cejas con un acabado natural y cálido.",
  },
];

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), "Aún no lo sé"];

const CREAM_MARK_FILTER =
  "brightness(0) saturate(100%) invert(87%) sepia(22%) saturate(560%) hue-rotate(342deg) brightness(97%) contrast(92%)";
const DARK_LOGO_FILTER =
  "brightness(0) saturate(100%) invert(11%) sepia(48%) saturate(2400%) hue-rotate(312deg) brightness(92%) contrast(94%)";

const FONT_JOST = "var(--font-jost), system-ui, sans-serif";
const FONT_BODONI = "var(--font-bodoni), serif";
const FONT_CORMORANT = "var(--font-cormorant), serif";

type FormState = {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const roundFrame: CSSProperties = {
  position: "relative",
  overflow: "hidden",
  backgroundColor: "var(--bg2)",
  backgroundImage:
    "repeating-linear-gradient(135deg, color-mix(in srgb, var(--taupe) 44%, transparent) 0 1.5px, transparent 1.5px 17px)",
  boxShadow: "0 40px 80px -50px rgba(50,22,30,.5)",
  borderRadius: "var(--frame)",
};

function stop(e: MouseEvent) {
  e.stopPropagation();
}

export default function ZairaLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [booking, setBooking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = booking ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booking]);

  function openBooking(service?: string) {
    setSubmitted(false);
    setErrors({});
    setForm((f) => ({ ...f, service: service ?? f.service }));
    setBooking(true);
  }

  function closeBooking() {
    setBooking(false);
  }

  function setField(key: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function submit() {
    const e: FormErrors = {};
    if (!form.service) e.service = "Elige un servicio";
    if (!form.date) e.date = "Elige una fecha";
    if (!form.time) e.time = "Elige una hora";
    if (!form.name.trim()) e.name = "Ingresa tu nombre";
    if (!form.phone.trim()) e.phone = "Ingresa tu teléfono";
    else if (form.phone.replace(/\D/g, "").length < 7) e.phone = "Teléfono no válido";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: FONT_JOST,
        WebkitFontSmoothing: "antialiased",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: scrolled ? "var(--bg)" : "transparent",
          boxShadow: scrolled
            ? "0 1px 0 var(--line), 0 16px 50px rgba(30,15,18,.08)"
            : "none",
          backdropFilter: "blur(10px)",
          transition: "background .45s ease, box-shadow .45s ease, padding .35s ease",
          padding: `${scrolled ? "15px" : "26px"} clamp(20px,5vw,72px)`,
        }}
      >
        <nav
          style={{
            maxWidth: 1340,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            color: scrolled ? "var(--ink)" : "#EAD3B8",
          }}
        >
          <a
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 50,
                height: 50,
                backgroundImage: "url('/assets/zaria-mark.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                filter: scrolled ? DARK_LOGO_FILTER : CREAM_MARK_FILTER,
                transition: "filter .45s ease",
                display: "block",
              }}
            />
          </a>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(18px,2.6vw,40px)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { href: "#esencia", label: "Esencia" },
              { href: "#servicios", label: "Servicios" },
              { href: "#estudio", label: "El estudio" },
              { href: "#contacto", label: "Contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: 12.5,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => openBooking()}
            className="btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid currentColor",
              background: "transparent",
              color: "inherit",
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 11.5,
              fontWeight: 500,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background .35s ease,color .35s ease,border-color .35s ease",
            }}
          >
            Reservar cita
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="hero"
        style={{
          position: "relative",
          background:
            "radial-gradient(125% 120% at 50% 34%, #5A1728 0%, #431020 48%, #2C0A15 100%)",
          color: "#F1DFCF",
          padding: "clamp(120px,15vh,180px) clamp(20px,5vw,72px) clamp(72px,9vw,120px)",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(200,166,108,.12), transparent 42%),radial-gradient(circle at 82% 78%, rgba(200,166,108,.09), transparent 45%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONT_JOST,
              textTransform: "uppercase",
              letterSpacing: ".42em",
              fontSize: 12,
              fontWeight: 500,
              color: "#C8A66C",
              marginBottom: "clamp(18px,3vw,30px)",
              paddingLeft: ".42em",
            }}
          >
            Beauty Studio · Est. 2026
          </p>
          <div style={{ width: "min(80%,440px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/normal-logo.png"
              alt="ZARIA Beauty Studio"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <p
            style={{
              fontFamily: FONT_CORMORANT,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "calc(clamp(24px,3.6vw,40px) * var(--scale,1))",
              lineHeight: 1.25,
              color: "#EAD3B8",
              margin: "clamp(14px,2vw,24px) 0 0",
              textWrap: "balance",
            }}
          >
            Donde tu belleza florece.
          </p>
          <p
            style={{
              fontFamily: FONT_JOST,
              fontWeight: 300,
              fontSize: "clamp(15px,1.4vw,17px)",
              lineHeight: 1.75,
              color: "#E4CDBB",
              opacity: 0.85,
              maxWidth: "46ch",
              margin: "22px 0 40px",
            }}
          >
            Un estudio donde el cuidado se vuelve ritual. Tratamientos faciales,
            corporales y de la mirada, pensados para realzar —con delicadeza— lo
            que ya eres.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => openBooking()}
              className="btn-hero-solid"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#EBD6BC",
                color: "#42101E",
                border: "1px solid #EBD6BC",
                borderRadius: 999,
                padding: "17px 38px",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Reservar cita
            </button>
            <a
              href="#servicios"
              className="link-underline-hero"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                color: "#EAD3B8",
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                borderBottom: "1px solid currentColor",
                paddingBottom: 5,
              }}
            >
              Ver servicios →
            </a>
          </div>
        </div>
      </section>

      {/* ESENCIA */}
      <section id="esencia" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--wine)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              margin: "0 auto 26px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/zaria-mark.png"
              alt=""
              style={{
                width: "78%",
                height: "78%",
                objectFit: "contain",
                display: "block",
                filter: CREAM_MARK_FILTER,
              }}
            />
          </div>
          <p
            style={{
              fontFamily: FONT_JOST,
              textTransform: "uppercase",
              letterSpacing: ".34em",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--gold)",
              marginBottom: 30,
            }}
          >
            El significado
          </p>
          <p
            style={{
              fontFamily: FONT_CORMORANT,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "calc(clamp(28px,4.2vw,52px) * var(--scale,1))",
              lineHeight: 1.28,
              letterSpacing: ".005em",
              textWrap: "balance",
            }}
          >
            «ZAIRA significa flor que florece —<br />
            la mujer radiante que crece hacia su luz.»
          </p>
          <p
            style={{
              fontFamily: FONT_JOST,
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.8,
              color: "var(--ink-soft)",
              maxWidth: "60ch",
              margin: "34px auto 0",
            }}
          >
            Una belleza natural pero elevada. Lujo suave y accesible, energía
            femenina y cálida. No buscamos transformarte: acompañamos tu manera
            de florecer.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
              marginTop: 46,
            }}
          >
            {[
              "Belleza natural, elevada",
              "Lujo suave y accesible",
              "Energía femenina y cálida",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  padding: "11px 22px",
                  fontSize: 12.5,
                  letterSpacing: ".1em",
                  color: "var(--ink)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section
        id="servicios"
        style={{ background: "var(--bg2)", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,72px)" }}
      >
        <div style={{ maxWidth: 1340, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              marginBottom: "clamp(40px,5vw,72px)",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: FONT_JOST,
                  textTransform: "uppercase",
                  letterSpacing: ".34em",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--gold)",
                  marginBottom: 18,
                }}
              >
                Servicios
              </p>
              <h2
                style={{
                  fontFamily: FONT_BODONI,
                  fontWeight: 500,
                  fontSize: "calc(clamp(34px,5vw,62px) * var(--scale,1))",
                  lineHeight: 1.02,
                  letterSpacing: "-.01em",
                  textWrap: "balance",
                  maxWidth: "16ch",
                }}
              >
                Todo lo que tu belleza necesita
              </h2>
            </div>
            <p
              style={{
                fontFamily: FONT_JOST,
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--ink-soft)",
                maxWidth: "34ch",
              }}
            >
              Del rostro a la mirada, cada tratamiento se diseña a tu medida.
              Reserva el tuyo en segundos.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
              gap: 1,
              background: "var(--line)",
              border: "1px solid var(--line)",
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            {SERVICES.map((item) => (
              <div
                key={item.name}
                className="service-card"
                style={{
                  background: "var(--surface)",
                  padding: "clamp(26px,2.6vw,38px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  minHeight: 230,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_JOST,
                    textTransform: "uppercase",
                    letterSpacing: ".24em",
                    fontSize: 10.5,
                    fontWeight: 500,
                    color: "var(--gold)",
                  }}
                >
                  {item.cat}
                </span>
                <h3
                  style={{
                    fontFamily: FONT_CORMORANT,
                    fontWeight: 600,
                    fontSize: 28,
                    lineHeight: 1.05,
                    letterSpacing: ".005em",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontFamily: FONT_JOST,
                    fontWeight: 300,
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: "var(--ink-soft)",
                    flex: 1,
                  }}
                >
                  {item.desc}
                </p>
                <button
                  onClick={() => openBooking(item.name)}
                  className="link-wine"
                  style={{
                    alignSelf: "flex-start",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--wine)",
                    fontFamily: FONT_JOST,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid var(--wine)",
                    paddingBottom: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  Reservar →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILOSOFIA BAND */}
      <section
        style={{
          background: "var(--band-bg)",
          color: "var(--band-ink)",
          padding: "clamp(80px,11vw,150px) clamp(20px,5vw,72px)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: FONT_JOST,
              textTransform: "uppercase",
              letterSpacing: ".34em",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--band-ink)",
              opacity: 0.6,
              marginBottom: 22,
            }}
          >
            Filosofía
          </p>
          <h2
            style={{
              fontFamily: FONT_BODONI,
              fontWeight: 500,
              fontSize: "calc(clamp(34px,5.2vw,66px) * var(--scale,1))",
              lineHeight: 1.04,
              letterSpacing: "-.01em",
              textWrap: "balance",
              maxWidth: "18ch",
              marginBottom: "clamp(46px,6vw,80px)",
            }}
          >
            Más que un tratamiento, un ritual.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "clamp(30px,4vw,60px)",
            }}
          >
            {[
              {
                n: "01",
                title: "Cuidado",
                desc: "Cada detalle pensado para que te sientas en casa desde que cruzas la puerta.",
              },
              {
                n: "02",
                title: "Suavidad",
                desc: "Técnicas delicadas y profesionales, con resultados que se notan y se sienten.",
              },
              {
                n: "03",
                title: "Transformación",
                desc: "Acompañamos tu glow up paso a paso, a tu ritmo y con tu esencia intacta.",
              },
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  borderTop: "1px solid color-mix(in srgb,var(--band-ink) 28%,transparent)",
                  paddingTop: 26,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_BODONI,
                    fontSize: 30,
                    opacity: 0.55,
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  {step.n}
                </span>
                <h4
                  style={{
                    fontFamily: FONT_CORMORANT,
                    fontWeight: 600,
                    fontSize: 26,
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: FONT_JOST,
                    fontWeight: 300,
                    fontSize: 15,
                    lineHeight: 1.7,
                    opacity: 0.82,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESTUDIO */}
      <section id="estudio" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1340, margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              maxWidth: 680,
              margin: "0 auto clamp(48px,6vw,80px)",
            }}
          >
            <p
              style={{
                fontFamily: FONT_JOST,
                textTransform: "uppercase",
                letterSpacing: ".34em",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--gold)",
                marginBottom: 20,
              }}
            >
              El estudio
            </p>
            <h2
              style={{
                fontFamily: FONT_BODONI,
                fontWeight: 500,
                fontSize: "calc(clamp(34px,5vw,62px) * var(--scale,1))",
                lineHeight: 1.04,
                letterSpacing: "-.01em",
                textWrap: "balance",
              }}
            >
              Un espacio para detenerte
            </h2>
            <p
              style={{
                fontFamily: FONT_JOST,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.75,
                color: "var(--ink-soft)",
                marginTop: 22,
              }}
            >
              Arcos cálidos, luz tenue y materiales nobles. Cada rincón está
              hecho para que respires y te sueltes.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 22,
              alignItems: "end",
            }}
          >
            {[
              { h: 380, label: "foto · recepción" },
              { h: 460, label: "foto · cabina facial" },
              { h: 340, label: "foto · zona de uñas" },
              { h: 420, label: "foto · detalle" },
            ].map((photo) => (
              <div key={photo.label} style={{ ...roundFrame, height: photo.h }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 10.5,
                      letterSpacing: ".12em",
                      color: "var(--ink-soft)",
                      background: "var(--surface)",
                      padding: "7px 13px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                    }}
                  >
                    {photo.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIO */}
      <section
        style={{ background: "var(--bg2)", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,72px)" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: "50%",
              background: "var(--wine)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              margin: "0 auto 26px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/zaria-mark.png"
              alt=""
              style={{
                width: "78%",
                height: "78%",
                objectFit: "contain",
                display: "block",
                filter: CREAM_MARK_FILTER,
              }}
            />
          </div>
          <p
            style={{
              fontFamily: FONT_CORMORANT,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "calc(clamp(26px,3.6vw,44px) * var(--scale,1))",
              lineHeight: 1.3,
              textWrap: "balance",
            }}
          >
            Salí sintiéndome yo misma, pero mejor. Me cuidaron como a una amiga.
          </p>
          <p
            style={{
              fontFamily: FONT_JOST,
              textTransform: "uppercase",
              letterSpacing: ".24em",
              fontSize: 11.5,
              color: "var(--ink-soft)",
              marginTop: 30,
            }}
          >
            — Clienta ZAIRA
          </p>
        </div>
      </section>

      {/* RESERVA / CONTACTO */}
      <section
        id="contacto"
        style={{
          background: "var(--hero-bg)",
          color: "var(--hero-ink)",
          padding: "clamp(80px,11vw,150px) clamp(20px,5vw,72px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "clamp(44px,6vw,90px)",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: FONT_JOST,
                textTransform: "uppercase",
                letterSpacing: ".34em",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--gold)",
                marginBottom: 24,
              }}
            >
              Reserva
            </p>
            <h2
              style={{
                fontFamily: FONT_BODONI,
                fontWeight: 500,
                fontSize: "calc(clamp(40px,6vw,80px) * var(--scale,1))",
                lineHeight: 1,
                letterSpacing: "-.015em",
                textWrap: "balance",
              }}
            >
              ¿Lista para{" "}
              <em style={{ fontFamily: FONT_CORMORANT, fontStyle: "italic", fontWeight: 500 }}>
                florecer
              </em>
              ?
            </h2>
            <p
              style={{
                fontFamily: FONT_JOST,
                fontWeight: 300,
                fontSize: 17,
                lineHeight: 1.75,
                opacity: 0.8,
                margin: "28px 0 38px",
                maxWidth: "40ch",
              }}
            >
              Agenda tu cita en menos de un minuto. Te confirmamos por WhatsApp.
            </p>
            <button
              onClick={() => openBooking()}
              className="btn-wine-solid"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "var(--wine)",
                color: "#F8F1E8",
                border: "1px solid var(--wine)",
                borderRadius: 999,
                padding: "18px 40px",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Reservar cita
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Horario", value: "Lun – Sáb · 9:00 – 19:00" },
              { label: "Ubicación", value: "Calle [____], Ciudad" },
              { label: "Contacto", value: "@zaira.beautystudio" },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 20,
                  padding: "22px 0",
                  borderTop: "1px solid var(--line)",
                  borderBottom: i === 2 ? "1px solid var(--line)" : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_JOST,
                    textTransform: "uppercase",
                    letterSpacing: ".2em",
                    fontSize: 11.5,
                    color: "var(--gold)",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: FONT_CORMORANT,
                    fontSize: 21,
                    textAlign: "right",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "var(--foot-bg)",
          color: "var(--foot-ink)",
          padding: "clamp(64px,8vw,110px) clamp(20px,5vw,72px) 40px",
        }}
      >
        <div style={{ maxWidth: 1340, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 48,
              paddingBottom: 60,
              borderBottom: "1px solid color-mix(in srgb,var(--foot-ink) 22%,transparent)",
            }}
          >
            <div style={{ gridColumn: "1 / -1", maxWidth: 520 }}>
              <div style={{ width: 220, marginBottom: 16, marginLeft: -8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/normal-logo.png"
                  alt="ZARIA Beauty Studio"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <p style={{ fontFamily: FONT_CORMORANT, fontStyle: "italic", fontSize: 24, opacity: 0.85 }}>
                Donde tu belleza florece.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: FONT_JOST,
                  textTransform: "uppercase",
                  letterSpacing: ".22em",
                  fontSize: 11,
                  opacity: 0.6,
                  marginBottom: 18,
                }}
              >
                Navegación
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {[
                  { href: "#esencia", label: "Esencia" },
                  { href: "#servicios", label: "Servicios" },
                  { href: "#estudio", label: "El estudio" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="footer-link"
                    style={{ color: "inherit", textDecoration: "none", fontSize: 15, opacity: 0.85 }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p
                style={{
                  fontFamily: FONT_JOST,
                  textTransform: "uppercase",
                  letterSpacing: ".22em",
                  fontSize: 11,
                  opacity: 0.6,
                  marginBottom: 18,
                }}
              >
                Síguenos
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {["Instagram", "WhatsApp", "TikTok"].map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="footer-link"
                    style={{ color: "inherit", textDecoration: "none", fontSize: 15, opacity: 0.85 }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "space-between",
              paddingTop: 26,
              fontFamily: FONT_JOST,
              fontSize: 12,
              letterSpacing: ".08em",
              opacity: 0.6,
            }}
          >
            <span suppressHydrationWarning>© {new Date().getFullYear()} ZAIRA Beauty Studio</span>
            <span>Hecho con cuidado · belleza que florece</span>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {booking && (
        <div
          onClick={closeBooking}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(28,12,17,.55)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={stop}
            style={{
              background: "var(--surface)",
              color: "var(--ink)",
              width: "min(540px,100%)",
              maxHeight: "92vh",
              overflowY: "auto",
              borderRadius: 26,
              boxShadow: "0 60px 120px -40px rgba(30,10,16,.7)",
              position: "relative",
            }}
          >
            <div style={{ height: 8, background: "var(--wine)", borderRadius: "26px 26px 0 0" }} />
            <button
              onClick={closeBooking}
              className="modal-close-btn"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "1px solid var(--line)",
                background: "var(--bg)",
                color: "var(--ink)",
                fontSize: 17,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            {!submitted ? (
              <div style={{ padding: "clamp(30px,4vw,46px)" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--wine)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    marginBottom: 18,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/zaria-mark.png"
                    alt=""
                    style={{
                      width: "78%",
                      height: "78%",
                      objectFit: "contain",
                      display: "block",
                      filter: CREAM_MARK_FILTER,
                    }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: FONT_JOST,
                    textTransform: "uppercase",
                    letterSpacing: ".3em",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--gold)",
                    marginBottom: 14,
                  }}
                >
                  Reserva tu cita
                </p>
                <h3
                  style={{
                    fontFamily: FONT_BODONI,
                    fontWeight: 500,
                    fontSize: 34,
                    lineHeight: 1.05,
                    marginBottom: 28,
                  }}
                >
                  Cuéntanos qué necesitas
                </h3>

                <label
                  style={{
                    display: "block",
                    fontFamily: FONT_JOST,
                    fontSize: 12,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                    marginBottom: 8,
                  }}
                >
                  Servicio
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setField("service", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    background: "var(--bg)",
                    color: "var(--ink)",
                    fontSize: 15,
                    marginBottom: 6,
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Selecciona un servicio…</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span style={{ display: "block", color: "var(--wine)", fontSize: 12, marginBottom: 10 }}>
                    {errors.service}
                  </span>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: FONT_JOST,
                        fontSize: 12,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--ink-soft)",
                        marginBottom: 8,
                      }}
                    >
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setField("date", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "13px 14px",
                        border: "1px solid var(--line)",
                        borderRadius: 12,
                        background: "var(--bg)",
                        color: "var(--ink)",
                        fontSize: 15,
                      }}
                    />
                    {errors.date && (
                      <span style={{ display: "block", color: "var(--wine)", fontSize: 12, marginTop: 6 }}>
                        {errors.date}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: FONT_JOST,
                        fontSize: 12,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--ink-soft)",
                        marginBottom: 8,
                      }}
                    >
                      Hora
                    </label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => setField("time", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "13px 14px",
                        border: "1px solid var(--line)",
                        borderRadius: 12,
                        background: "var(--bg)",
                        color: "var(--ink)",
                        fontSize: 15,
                      }}
                    />
                    {errors.time && (
                      <span style={{ display: "block", color: "var(--wine)", fontSize: 12, marginTop: 6 }}>
                        {errors.time}
                      </span>
                    )}
                  </div>
                </div>

                <label
                  style={{
                    display: "block",
                    fontFamily: FONT_JOST,
                    fontSize: 12,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                    margin: "18px 0 8px",
                  }}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Tu nombre"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    background: "var(--bg)",
                    color: "var(--ink)",
                    fontSize: 15,
                  }}
                />
                {errors.name && (
                  <span style={{ display: "block", color: "var(--wine)", fontSize: 12, marginTop: 6 }}>
                    {errors.name}
                  </span>
                )}

                <label
                  style={{
                    display: "block",
                    fontFamily: FONT_JOST,
                    fontSize: 12,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                    margin: "18px 0 8px",
                  }}
                >
                  WhatsApp / Teléfono
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="+34 600 000 000"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    background: "var(--bg)",
                    color: "var(--ink)",
                    fontSize: 15,
                  }}
                />
                {errors.phone && (
                  <span style={{ display: "block", color: "var(--wine)", fontSize: 12, marginTop: 6 }}>
                    {errors.phone}
                  </span>
                )}

                <button
                  onClick={submit}
                  className="btn-wine-solid"
                  style={{
                    width: "100%",
                    marginTop: 30,
                    background: "var(--wine)",
                    color: "#F8F1E8",
                    border: "none",
                    borderRadius: 999,
                    padding: 17,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Confirmar reserva
                </button>
                <p
                  style={{
                    fontFamily: FONT_JOST,
                    fontSize: 12,
                    color: "var(--ink-soft)",
                    textAlign: "center",
                    marginTop: 16,
                    lineHeight: 1.5,
                  }}
                >
                  Te contactaremos para confirmar disponibilidad.
                </p>
              </div>
            ) : (
              <div style={{ padding: "clamp(40px,5vw,60px) clamp(30px,4vw,46px)", textAlign: "center" }}>
                <div
                  style={{
                    width: 74,
                    height: 74,
                    borderRadius: "50%",
                    background: "var(--wine)",
                    color: "#F8F1E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 26px",
                    fontSize: 34,
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: FONT_BODONI,
                    fontWeight: 500,
                    fontSize: 32,
                    lineHeight: 1.1,
                    marginBottom: 14,
                  }}
                >
                  ¡Gracias, {form.name}!
                </h3>
                <p
                  style={{
                    fontFamily: FONT_JOST,
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "var(--ink-soft)",
                    maxWidth: "36ch",
                    margin: "0 auto 16px",
                  }}
                >
                  Recibimos tu solicitud para{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{form.service}</strong> el{" "}
                  {form.date} a las {form.time}. Te confirmaremos por WhatsApp muy pronto.
                </p>
                <button
                  onClick={closeBooking}
                  className="btn-outline-ink"
                  style={{
                    marginTop: 14,
                    background: "none",
                    border: "1px solid var(--ink)",
                    color: "var(--ink)",
                    borderRadius: 999,
                    padding: "14px 32px",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
