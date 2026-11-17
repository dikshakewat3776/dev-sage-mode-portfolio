#!/usr/bin/env python3
"""Generate public/cover-letter.pdf (sync prose with content/cover-letter.md)."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "cover-letter.pdf"

BODY = [
    "Dear Hiring Manager,",
    "",
    "I believe great engineering is about more than building software - it is about solving "
    "complex problems, creating scalable platforms, and enabling teams to deliver meaningful "
    "business outcomes.",
    "",
    "I bring a platform-first mindset, strong architectural thinking, and an ownership-driven "
    "approach to engineering leadership. My focus is on simplifying complexity, modernizing "
    "legacy systems, building resilient distributed architectures, and translating business "
    "challenges into reliable technology solutions.",
    "",
    "I value pragmatic innovation: balancing speed with engineering excellence, scalability with "
    "governance, and experimentation with production reliability. I strive to build teams that "
    "think beyond individual deliverables, take end-to-end ownership, and continuously raise the "
    "bar on quality and execution.",
    "",
    "I am particularly passionate about fintech innovation, intelligent automation, and "
    "responsible enterprise AI - building technology that is not only scalable and efficient "
    "but also secure, observable, and built to last.",
    "",
    "I look forward to bringing this mindset, technical perspective, and collaborative leadership "
    "to a team that values innovation, accountability, and long-term impact.",
    "",
    "Sincerely,",
    "Diksha Kewat",
]


class CoverLetterPDF(FPDF):
    def __init__(self) -> None:
        super().__init__(unit="mm", format="Letter")
        self.set_auto_page_break(auto=True, margin=22)
        self.set_margins(22, 22, 22)


def write_para(pdf: FPDF, text: str, *, bold: bool = False, size: float = 10.5) -> None:
    pdf.set_font("Helvetica", "B" if bold else "", size)
    pdf.multi_cell(pdf.epw, 5.5, text)


def build() -> None:
    pdf = CoverLetterPDF()
    pdf.add_page()
    w = pdf.epw

    pdf.set_font("Helvetica", "B", 14)
    pdf.multi_cell(w, 7, "DIKSHA KEWAT")
    pdf.ln(1)

    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(36, 72, 120)
    pdf.multi_cell(
        w,
        5,
        "Engineering Leadership | Fintech Platforms | Distributed Systems | Enterprise AI",
    )
    pdf.set_text_color(0, 0, 0)
    pdf.ln(3)

    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(w, 5, "November 2026")
    pdf.set_text_color(0, 0, 0)
    pdf.ln(8)

    for i, para in enumerate(BODY):
        if para == "":
            pdf.ln(2)
            continue
        if para == "Sincerely,":
            pdf.ln(2)
            write_para(pdf, para, bold=True)
        elif i == len(BODY) - 1:
            write_para(pdf, para, bold=True)
        else:
            write_para(pdf, para)
        pdf.ln(1)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()