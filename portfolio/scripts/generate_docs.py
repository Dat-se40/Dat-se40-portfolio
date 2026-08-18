#!/usr/bin/env python3
"""Generate the downloadable CV and academic record PDFs + card previews."""

from pathlib import Path

from fpdf import FPDF
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "assets" / "docs"
FONT_SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_SANS_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
FONT_SERIF_B = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

NAVY = (5, 23, 47)
INK = (10, 13, 21)
GOLD = (214, 187, 128)
WHEAT = (194, 160, 114)
PAPER = (232, 223, 200)
MUTED = (90, 96, 104)
RULE = (180, 160, 110)


class Dossier(FPDF):
    def __init__(self, footer_label):
        super().__init__(format="A4")
        self.footer_label = footer_label
        self.set_auto_page_break(auto=True, margin=18)
        self.add_font("Sans", "", FONT_SANS)
        self.add_font("Sans", "B", FONT_SANS_B)
        self.add_font("Serif", "", FONT_SERIF)
        self.add_font("Serif", "B", FONT_SERIF_B)

    def footer(self):
        self.set_y(-14)
        self.set_draw_color(*GOLD)
        self.set_line_width(0.2)
        self.line(16, self.get_y(), 194, self.get_y())
        self.set_y(-11)
        self.set_font("Sans", "", 7.5)
        self.set_text_color(*MUTED)
        self.cell(0, 5, self.footer_label, align="L")
        self.cell(0, 5, f"{self.page_no():02d}", align="R")

    def gold_rule(self, y=None, pad=3):
        if y is None:
            y = self.get_y() + pad
        self.set_draw_color(*GOLD)
        self.set_line_width(0.35)
        self.line(16, y, 194, y)
        self.set_y(y + 4)

    def section(self, title):
        self.set_y(self.get_y() + 3.5)
        self.set_font("Sans", "B", 8.2)
        self.set_text_color(*GOLD)
        self.cell(0, 5, title.upper())
        self.ln(2)
        self.set_draw_color(*GOLD)
        self.set_line_width(0.25)
        y = self.get_y()
        self.line(16, y, 52, y)
        self.ln(3.2)

    def body(self, text, size=9.4, leading=4.7):
        self.set_font("Sans", "", size)
        self.set_text_color(*INK)
        self.multi_cell(178, leading, text)
        self.ln(1)


def build_cv(path: Path) -> None:
    pdf = Dossier("Dat-se40  ·  Curriculum Vitae  ·  2026")
    pdf.add_page()
    pdf.set_margins(16, 16, 16)

    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, 210, 48, "F")
    pdf.set_fill_color(*GOLD)
    pdf.rect(0, 48, 210, 1.4, "F")

    pdf.set_xy(16, 10)
    pdf.set_font("Sans", "", 8)
    pdf.set_text_color(*GOLD)
    pdf.cell(90, 5, "DAT-SE40  ·  PORTFOLIO DOSSIER")
    pdf.cell(88, 5, "SAIGON  ·  VIETNAM", align="R")

    pdf.set_xy(16, 18)
    pdf.set_font("Serif", "B", 26)
    pdf.set_text_color(*PAPER)
    pdf.cell(0, 11, "NGUYỄN TẤN ĐẠT")

    pdf.set_xy(16, 31)
    pdf.set_font("Sans", "", 9.5)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 5, "Backend student  ·  Software Engineering  ·  UIT — VNU-HCM")

    pdf.set_xy(16, 38)
    pdf.set_font("Sans", "", 8)
    pdf.set_text_color(*PAPER)
    pdf.cell(0, 5, "github.com/Dat-se40     leetcode.com/u/Dat-se40     facebook.com/1590laupaylak")

    pdf.set_y(56)
    pdf.section("Profile")
    pdf.body(
        "Software Engineering student at the University of Information Technology "
        "(VNU-HCM), cohort 2024–2028. I work on backend system architecture, "
        "concurrency, and event-driven programming. Basic CRUD is not the interesting "
        "part — I prefer design patterns, containerization, and the places a system "
        "breaks before the interface loads. Currently focused on Spring Boot, "
        "microservices, and clean code. Desktop (WPF), games (Unity), and Java APIs "
        "are where the hours go."
    )

    pdf.section("Education")
    pdf.set_font("Sans", "B", 10)
    pdf.set_text_color(*INK)
    pdf.cell(130, 5, "University of Information Technology — VNU-HCM")
    pdf.set_font("Sans", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(48, 5, "2024 — 2028", align="R")
    pdf.ln(5.2)
    pdf.set_font("Sans", "", 9.2)
    pdf.set_text_color(*INK)
    pdf.cell(0, 4.6, "Bachelor of Software Engineering")
    pdf.ln(4.6)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        178,
        4.4,
        "Currently enrolled, year 2. Coursework and personal work center on backend "
        "services, relational modeling, and networked applications.",
    )

    pdf.section("Selected work")
    projects = [
        (
            "Royal Blueberry Dictionary",
            "Desktop Application · 2026",
            "Client–server English dictionary. WPF client, Spring Boot backend, JWT and "
            "Google OAuth2, SQL relational model with dependency injection, semantic "
            "search, Docker. Migrated from a NoSQL JSON store to a structured SQL design.",
        ),
        (
            "Bommy",
            "Multiplayer Game · 2026",
            "Unity 6 networked bomber game. Led a 4-person team. Peer-to-peer lobby "
            "architecture for matchmaking, destructible environments, and synchronized "
            "game state — concurrency without a dedicated server.",
        ),
        (
            "Mosquizto",
            "Android + Backend · 2026",
            "Flashcard learning platform. Android client, Spring Boot, PostgreSQL, Redis, "
            "Meilisearch (chosen over Elasticsearch to keep memory down), WebSocket "
            "social features, Docker.",
        ),
        (
            "Genesis",
            "2D Pixel RPG · 2026",
            "UIT freshman-survival RPG / visual novel. Explore campus, collect clues, "
            "solve IT puzzles. Double2T team. Second Place, DEVO game category.",
        ),
    ]
    for title, when, blurb in projects:
        pdf.set_font("Sans", "B", 10)
        pdf.set_text_color(*INK)
        pdf.cell(118, 5, title)
        pdf.set_font("Sans", "", 8)
        pdf.set_text_color(*WHEAT)
        pdf.cell(60, 5, when, align="R")
        pdf.ln(5)
        pdf.set_font("Sans", "", 8.8)
        pdf.set_text_color(*INK)
        pdf.multi_cell(178, 4.3, blurb)
        pdf.ln(1.6)

    pdf.section("Stack")
    rows = [
        ("Languages", "Java, C#, C++, PostgreSQL"),
        ("Backend & tools", "Spring, .NET / WPF, Node.js, MongoDB, Docker, Git, Postman, LaTeX"),
        ("Other", "Unity, Android, REST API design"),
        ("Learning now", "Software architecture, clean code, microservices"),
    ]
    for label, value in rows:
        pdf.set_font("Sans", "B", 8.4)
        pdf.set_text_color(*GOLD)
        pdf.cell(36, 4.8, label.upper())
        pdf.set_font("Sans", "", 9.2)
        pdf.set_text_color(*INK)
        pdf.cell(142, 4.8, value)
        pdf.ln(5)

    pdf.section("Awards")
    pdf.set_font("Sans", "B", 10)
    pdf.set_text_color(*INK)
    pdf.cell(148, 5, "DEVO — 20th Anniversary SE Dev Challenge")
    pdf.set_font("Sans", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(30, 5, "2026", align="R")
    pdf.ln(5)
    pdf.set_font("Sans", "", 9.2)
    pdf.set_text_color(*INK)
    pdf.cell(0, 4.6, "Second Place — Game Category  ·  Genesis / Double2T")
    pdf.ln(7)

    pdf.section("Availability")
    pdf.body(
        "Open to backend internships — Java or .NET. Prefer a real problem over a "
        "ten-page job description. References and the official UIT transcript are "
        "available from the portfolio Reference section."
    )

    path.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(path))


def build_transcript(path: Path) -> None:
    pdf = Dossier("Dat-se40  ·  Hồ sơ học tập / Academic record  ·  Unofficial")
    pdf.add_page()
    pdf.set_margins(16, 16, 16)

    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, 210, 54, "F")
    pdf.set_fill_color(*GOLD)
    pdf.rect(0, 54, 210, 1.4, "F")

    pdf.set_xy(16, 9)
    pdf.set_font("Sans", "", 8)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 5, "ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH")
    pdf.set_xy(16, 14)
    pdf.set_font("Serif", "B", 13)
    pdf.set_text_color(*PAPER)
    pdf.cell(0, 6, "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN")
    pdf.set_xy(16, 21)
    pdf.set_font("Sans", "", 8)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 4.5, "UNIVERSITY OF INFORMATION TECHNOLOGY  ·  VNU-HCM")

    pdf.set_xy(16, 30)
    pdf.set_font("Serif", "B", 20)
    pdf.set_text_color(*PAPER)
    pdf.cell(0, 8, "HỒ SƠ HỌC TẬP")
    pdf.set_xy(16, 39)
    pdf.set_font("Sans", "", 10)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 5, "ACADEMIC RECORD  ·  UNOFFICIAL PORTFOLIO COPY")
    pdf.set_xy(16, 45.5)
    pdf.set_font("Sans", "", 7.5)
    pdf.set_text_color(*PAPER)
    pdf.cell(0, 4, "Issued for recruiter review  ·  August 2026  ·  Not a registrar original")

    pdf.set_y(62)
    pdf.section("Student")

    fields = [
        ("Họ và tên / Full name", "Nguyễn Tấn Đạt"),
        ("Tên gọi / Handle", "Dat-se40"),
        ("Cơ sở / Institution", "UIT — Vietnam National University, Ho Chi Minh City"),
        ("Ngành / Program", "Kỹ thuật Phần mềm / Software Engineering"),
        ("Hệ đào tạo / Degree", "Đại học chính quy / Full-time bachelor"),
        ("Khóa / Cohort", "2024 — 2028"),
        ("Năm học hiện tại / Standing", "Năm 2 / Year 2  (as of 2026)"),
        ("Cơ sở / Campus", "Thành phố Hồ Chí Minh / Saigon"),
        ("Tình trạng / Status", "Đang theo học / Currently enrolled"),
    ]
    for label, value in fields:
        y = pdf.get_y()
        pdf.set_fill_color(246, 242, 232)
        if int((y // 7) % 2) == 0:
            pdf.rect(16, y, 178, 7.2, "F")
        pdf.set_xy(18, y + 1.2)
        pdf.set_font("Sans", "", 8)
        pdf.set_text_color(*MUTED)
        pdf.cell(78, 5, label)
        pdf.set_font("Sans", "B", 9.2)
        pdf.set_text_color(*INK)
        pdf.cell(98, 5, value)
        pdf.set_y(y + 7.2)

    pdf.ln(3)
    pdf.section("Recognition")
    pdf.set_font("Sans", "B", 10)
    pdf.set_text_color(*INK)
    pdf.cell(148, 5, "DEVO — 20th Anniversary SE Dev Challenge")
    pdf.set_font("Sans", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(30, 5, "2026", align="R")
    pdf.ln(5.4)
    pdf.set_font("Sans", "", 9.2)
    pdf.set_text_color(*INK)
    pdf.multi_cell(
        178,
        4.6,
        "Second Place, Game Category. Project Genesis (team Double2T) — a 2D pixel "
        "RPG built for UIT's 20th anniversary.",
    )

    pdf.ln(2)
    pdf.section("Focus of study")
    pdf.body(
        "Backend systems (Java / Spring Boot, C# / .NET), relational databases, "
        "REST API design, containerization, and networked applications. Studio and "
        "lab work also includes desktop clients (WPF) and real-time games (Unity).",
        size=9.2,
        leading=4.6,
    )

    pdf.section("Verification")
    pdf.body(
        "This sheet is an unofficial academic summary prepared for the Dat-se40 "
        "portfolio. It does not replace the official UIT transcript (bảng điểm) "
        "issued by the Office of Academic Affairs. Course-by-course grades are "
        "held by the university registrar and can be provided on request.",
        size=9.0,
        leading=4.5,
    )

    pdf.ln(10)
    pdf.set_draw_color(*GOLD)
    pdf.line(16, pdf.get_y(), 78, pdf.get_y())
    pdf.ln(2)
    pdf.set_font("Sans", "B", 9)
    pdf.set_text_color(*INK)
    pdf.cell(0, 4.5, "Nguyễn Tấn Đạt")
    pdf.ln(4.2)
    pdf.set_font("Sans", "", 8)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 4, "Student  ·  github.com/Dat-se40")

    path.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(path))


def preview_card(path: Path, kicker: str, title: str, subtitle: str) -> None:
    w, h = 880, 560
    img = Image.new("RGB", (w, h), NAVY)
    draw = ImageDraw.Draw(img)
    try:
        serif = ImageFont.truetype(FONT_SERIF_B, 54)
        sans = ImageFont.truetype(FONT_SANS, 20)
        small = ImageFont.truetype(FONT_SANS, 16)
    except OSError:
        serif = sans = small = ImageFont.load_default()

    draw.rectangle((0, 0, w, 8), fill=GOLD)
    draw.rectangle((0, h - 8, w, h), fill=GOLD)
    draw.rectangle((36, 36, w - 36, h - 36), outline=GOLD, width=1)
    draw.text((64, 72), kicker, font=small, fill=GOLD)
    draw.text((64, 200), title, font=serif, fill=PAPER)
    draw.text((64, 280), subtitle, font=sans, fill=WHEAT)
    draw.text((64, 430), "DAT-SE40  ·  DOWNLOADABLE FILE", font=small, fill=GOLD)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "JPEG", quality=90)


def main() -> None:
    DOCS.mkdir(parents=True, exist_ok=True)
    cv = DOCS / "CV-Nguyen-Tan-Dat.pdf"
    rec = DOCS / "Bang-diem-UIT.pdf"
    build_cv(cv)
    build_transcript(rec)
    preview_card(DOCS / "cv-preview.jpg", "CURRICULUM VITAE", "Nguyễn Tấn Đạt", "Backend  ·  UIT  ·  2026")
    preview_card(
        DOCS / "transcript-preview.jpg",
        "HỒ SƠ HỌC TẬP",
        "Academic record",
        "UIT — VNU-HCM  ·  Software Engineering",
    )
    print("wrote", cv, rec.stat().st_size if rec.exists() else 0)


if __name__ == "__main__":
    main()
