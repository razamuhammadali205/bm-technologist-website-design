'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  GraduationCap,
  Heart,
  CircleUserRound,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Quote,
  Sparkles,
  Star,
  Users,
  X,
  Video,
} from 'lucide-react'

const whatsappNumber = '923028770999'
const emailAddress = 'hello@bm-technologist.com'
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Assalamu Alaikum, I would like to book a free Quran trial class with BM-Technologist.')}`
const emailHref = `mailto:${emailAddress}?subject=${encodeURIComponent('Free Quran Trial Class - BM-Technologist')}&body=${encodeURIComponent('Assalamu Alaikum,\n\nI am interested in booking a free Quran trial class with BM-Technologist.\n\nThank you.')}`

const courses = [
  ['Noorani Qaida', 'Learn Arabic letters, pronunciation and the fundamentals needed for Quran reading.', BookOpen],
  ['Quran Reading', 'Develop confidence and accuracy in reading the Holy Quran.', BookOpen],
  ['Quran With Tajweed', 'Learn Tajweed rules and improve Quran pronunciation and recitation.', Sparkles],
  ['Quran Memorization — Hifz', 'Build a structured memorization routine with regular revision and guidance.', GraduationCap],
  ['Namaz & Daily Duas', 'Learn essential prayers, duas and Islamic practices.', Heart],
  ['Islamic Studies', 'Learn essential Islamic knowledge in an easy and engaging way.', Star],
]
const faqs = [
  ['Who can join BM-Technologist Quran classes?', 'Our programs are designed for children, teenagers, adults, beginners and students looking to improve their recitation.'],
  ['Do you teach children?', 'Yes. Our learning approach can be adapted for young learners as well as adults.'],
  ['Do you offer female Quran teachers?', 'Teacher availability can be discussed when you request your free trial.'],
  ['Are classes one-to-one?', 'Our courses are presented as focused one-to-one online learning sessions.'],
  ['What Quran courses are available?', 'Noorani Qaida, Quran Reading, Tajweed, Hifz, Namaz & Duas and Islamic Studies.'],
  ['Do you offer a free trial?', 'Yes. You can request a free trial class using the form on this page.'],
  ['Can I choose my preferred class timing?', 'Share your preferred days and time in the form and we will discuss availability.'],
  ['Do you teach students internationally?', 'Online learning makes it possible to connect with students from different locations.'],
  ['How are online classes conducted?', 'Classes are held online with a teacher using a convenient video learning setup.'],
  ['How can I contact BM-Technologist?', 'Reach out by WhatsApp or email and our team will guide you through the next step.'],
]

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const closeMenu = () => setMenuOpen(false)
  const [submitting, setSubmitting] = useState(false)
  const submitTrial = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) { setFormError('Please complete the required fields before submitting.'); return }
    setSubmitting(true)
    setFormError('')
    try {
  const keyResponse = await fetch('/api/contact')
  const keyResult = await keyResponse.json().catch(() => null)
  if (!keyResponse.ok || typeof keyResult?.accessKey !== 'string') {
  throw new Error(keyResult?.error || 'Web3Forms access key is not configured.')
  }
  const formData = new FormData(form)
  formData.append('access_key', keyResult.accessKey)
  formData.append('subject', 'New BM-Technologist Website Request')
  formData.append('from_name', 'BM-Technologist Website')
  formData.append('botcheck', '')
  const response = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { Accept: 'application/json' },
  body: formData,
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.success) {
  throw new Error(typeof result?.error === 'string' ? result.error : 'Web3Forms could not deliver your request.')
  }
  setSubmitted(true)
  form.reset()
  } catch (error) {
  setFormError(error instanceof Error ? error.message : 'Web3Forms could not deliver your request.')
  } finally {
      setSubmitting(false)
    }
  }

  const structuredData = { '@context': 'https://schema.org', '@graph': [{ '@type': 'EducationalOrganization', name: 'BM-Technologist', description: 'Online Quran and Islamic education for children, teenagers and adults worldwide.', url: 'https://bm-technologist.com' }, { '@type': 'WebSite', name: 'BM-Technologist', url: 'https://bm-technologist.com' }, { '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }] }

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <header className="site-header">
      <div className="container nav-inner">
        <a href="#home" className="brand" onClick={closeMenu}><span className="brand-mark">ب</span><span>BM-Technologist<small>QURAN ACADEMY</small></span></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {['About', 'Courses', 'Teachers', 'Pricing', 'Testimonials', 'FAQ', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
          <a className="button button-small" href="#trial" onClick={closeMenu}>Book Free Trial <ArrowRight /></a>
        </nav>
      </div>
    </header>

    <section id="home" className="hero"><div className="hero-pattern" /><div className="container hero-grid">
      <div className="hero-copy"><p className="eyebrow light">ONLINE QURAN ACADEMY</p><h1>Learn Quran online.<br /><em>Grow with faith.</em></h1><p className="hero-text">Learn Quran, Tajweed, Hifz and Islamic Studies through convenient one-to-one online classes for children and adults worldwide.</p><div className="hero-actions"><a className="button" href="#trial">Book a FREE Trial Class <ArrowRight /></a><a className="text-link light-link" href="#courses">Explore Our Courses <ArrowRight /></a></div><div className="trust-list">{['Qualified Teachers', 'One-to-One Classes', 'Flexible Timings', 'Kids & Adults', 'Learn From Anywhere'].map(x => <span key={x}><Check />{x}</span>)}</div></div>
      <div className="hero-visual"><div className="hero-image-wrap"><img src="/quran-hero.png" alt="Open Quran resting in warm light" /></div><div className="hero-note"><span className="note-icon"><Play fill="currentColor" /></span><span><strong>Begin your journey</strong><small>with a free trial class</small></span></div></div>
    </div></section>

    <section className="trust-strip"><div className="container trust-strip-inner"><span>Trusted learning for every stage of life</span><div><span><Users /> Children & Families</span><span><GraduationCap /> Beginners Welcome</span><span><Clock3 /> Learn at your pace</span></div></div></section>

    <section id="about" className="section about"><div className="container about-grid"><div className="about-art"><div className="arch-frame"><div className="arch-inner"><span className="arabic">اقْرَأْ</span><span className="translation">Read</span></div></div><div className="seal"><span>BM</span><small>WITH FAITH</small></div></div><div className="about-copy"><SectionHeading eyebrow="OUR APPROACH" title="A thoughtful way to learn the Quran" description="BM-Technologist provides online Quran and Islamic education through a convenient, encouraging learning environment." /><p>Whether you are opening the Quran for the first time or working to strengthen your recitation, our lessons are shaped around your goals. We make space for questions, steady progress and a love of learning.</p><div className="pill-list"><span>Quran Reading</span><span>Tajweed</span><span>Quran Memorization</span><span>Noorani Qaida</span><span>Islamic Studies</span><span>Namaz & Duas</span></div><a className="text-link" href="#trial">Start Your Quran Journey <ArrowRight /></a></div></div></section>

    <section id="courses" className="section courses"><div className="container"><SectionHeading eyebrow="WHAT WE TEACH" title="Courses for every Quran journey" description="Clear, focused lessons that meet you where you are and help you move forward with confidence." /><div className="course-grid">{courses.map(([title, desc, Icon]) => <article className="course-card" key={title as string}><div className="icon-box"><Icon /></div><h3>{title as string}</h3><p>{desc as string}</p><a href="#trial" className="card-link">Learn more <ArrowRight /></a></article>)}</div></div></section>

    <section className="section why"><div className="container why-grid"><div><SectionHeading eyebrow="WHY BM-TECHNOLOGIST" title="Learning that feels personal" description="A calm, flexible online experience built around the needs of real students and families." /><a className="button button-dark" href="#trial">Find your learning path <ArrowRight /></a></div><div className="feature-list">{[['Qualified Quran Teachers', 'Learn with clear explanations and patient guidance.'], ['One-to-One Online Classes', 'A focused space to ask questions and practice.'], ['Flexible Class Timings', 'Build learning into the rhythm of your week.'], ['Kids & Adults', 'A welcoming place for beginners and lifelong learners.'], ['Personalized Guidance', 'Move forward with a plan shaped around you.'], ['Learn From Anywhere', 'Bring your Quran learning journey wherever you are.']].map(([title, text], i) => <div className="feature" key={title}><span className="feature-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    <section className="section process"><div className="container"><SectionHeading eyebrow="YOUR FIRST STEP" title="Start learning in 3 simple steps" /><div className="process-grid">{[['01', 'Book Your Free Trial', 'Complete the simple trial class request form.'], ['02', 'Meet Your Teacher', 'Attend your online trial class and ask questions.'], ['03', 'Begin Your Quran Journey', 'Choose your course and preferred schedule.']].map(([n, t, d]) => <div className="process-step" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div><div className="center"><a className="button" href="#trial">Book Free Trial <ArrowRight /></a></div></div></section>

    <section id="teachers" className="section teachers"><div className="container"><SectionHeading eyebrow="YOUR LEARNING TEAM" title="Meet your Quran teachers" description="Our teacher profiles will be added here as BM-Technologist shares their information. We believe in introducing every teacher honestly and clearly." /><div className="teacher-placeholder"><div className="placeholder-avatar"><Users /></div><div><h3>Teacher profiles coming soon</h3><p>Editable profile space for real teacher names, specialties, qualifications and experience.</p></div></div></div></section>

    <section id="pricing" className="section pricing"><div className="container"><SectionHeading eyebrow="SIMPLE PLANS" title="Choose your learning plan" description="Start with a plan that fits your rhythm. Contact us for current pricing and availability." /><div className="price-grid">{[['BASIC', '2', ['One-to-one classes', 'Flexible scheduling']], ['STANDARD', '3', ['One-to-one classes', 'Flexible scheduling', 'Progress guidance']], ['PREMIUM', '5', ['One-to-one classes', 'Flexible scheduling', 'Personalized learning']]].map(([name, count, features], i) => <article className={`price-card ${i === 1 ? 'featured' : ''}`} key={name as string}><span className="price-label">{name}</span>{i === 1 && <span className="popular">MOST POPULAR</span>}<div className="price"><strong>Contact us</strong><small>for pricing</small></div><p><b>{count}</b> classes per week</p><ul>{(features as string[]).map(f => <li key={f}><Check />{f}</li>)}</ul><a className={i === 1 ? 'button' : 'button button-outline'} href="#trial">Get Started <ArrowRight /></a></article>)}</div></div></section>

    <section id="testimonials" className="section testimonials"><div className="container testimonial-grid"><div className="quote-mark"><Quote /></div><div><SectionHeading eyebrow="STUDENT STORIES" title="A space to learn with confidence" description="Real student and parent stories will appear here as they are shared with BM-Technologist." /><div className="testimonial-placeholder"><p>“Your story could be the next encouragement for someone beginning their Quran journey.”</p><small>— Editable testimonial placeholder</small></div></div></div></section>

    <section id="faq" className="section faq"><div className="container faq-grid"><SectionHeading eyebrow="QUESTIONS, ANSWERED" title="Everything you need to know" description="Have another question? Reach out and we will be happy to help." /><div className="accordion">{faqs.map(([q, a], i) => <div className={`faq-item ${openFaq === i ? 'active' : ''}`} key={q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>{q}</span><ChevronDown /></button>{openFaq === i && <p>{a}</p>}</div>)}</div></div></section>

    <section id="trial" className="trial"><div className="container trial-grid"><div className="trial-copy"><p className="eyebrow light">TAKE THE FIRST STEP</p><h2>Start your Quran learning journey today.</h2><p>Book your free trial class and experience online Quran learning with BM-Technologist.</p><div className="trial-contact"><a href={whatsappHref}><MessageCircle /> Chat on WhatsApp</a><a href={emailHref}><Mail /> {emailAddress}</a></div></div><form className="trial-form" onSubmit={submitTrial} noValidate><div className="form-heading"><h3>Request your free trial</h3><p>Tell us a little about your learning goals.</p></div>{submitted ? <div className="success-message"><Check /><h3>Thank you for reaching out.</h3><p>Your request is ready to be reviewed. We will be in touch using the details you provided.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>Submit another request</button></div> : <><div className="form-grid"><label>Full Name *<input name="name" required placeholder="Your name" /></label><label>Age<input name="age" type="number" min="3" placeholder="Age" /></label><label>Country *<input name="country" required placeholder="Where are you based?" /></label><label>WhatsApp Number *<input name="whatsapp" required type="tel" placeholder="International number" /></label><label>Email *<input name="email" required type="email" placeholder="you@example.com" /></label><label>Course Interested In<select name="course" defaultValue=""><option value="" disabled>Select a course</option>{courses.map(([title]) => <option key={title as string}>{title as string}</option>)}</select></label><label>Preferred Days<input name="days" placeholder="e.g. Mon, Wed" /></label><label>Preferred Time<input name="time" placeholder="e.g. 6:00 PM" /></label></div><label>Message<textarea name="message" rows={3} placeholder="Tell us how we can help..." /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button button-full" type="submit">Request Free Trial <ArrowRight /></button><p className="form-note">No payment required. We will contact you to confirm details.</p></>}</form></div></section>

    <footer className="footer"><div className="container footer-grid"><div><a href="#home" className="brand footer-brand"><span className="brand-mark">ب</span><span>BM-Technologist<small>QURAN ACADEMY</small></span></a><p>Learn Quran. Understand Islam. Grow With Faith.</p><div className="socials"><a href="#contact" aria-label="Instagram"><CircleUserRound /></a><a href="#contact" aria-label="YouTube"><Video /></a></div></div><div><h4>Explore</h4><a href="#about">About us</a><a href="#courses">Our courses</a><a href="#teachers">Teachers</a><a href="#pricing">Pricing</a></div><div><h4>Courses</h4><a href="#courses">Noorani Qaida</a><a href="#courses">Quran Reading</a><a href="#courses">Tajweed</a><a href="#courses">Hifz</a></div><div id="contact"><h4>Contact</h4><a href={whatsappHref}><MessageCircle /> WhatsApp</a><a href={emailHref}><Mail /> {emailAddress}</a><a href="#faq">Privacy Policy</a><a href="#faq">Terms & Conditions</a></div></div><div className="container footer-bottom"><span>© 2026 BM-Technologist. All rights reserved.</span><span>Made for learners everywhere.</span></div></footer>
    <a className="floating-whatsapp" href={whatsappHref} aria-label="Chat with BM-Technologist on WhatsApp"><MessageCircle /></a>
    {submitted && <div className="success-popup-backdrop" role="presentation"><div className="success-popup" role="dialog" aria-modal="true" aria-labelledby="success-title"><button type="button" className="success-popup-close" aria-label="Close confirmation" onClick={() => setSubmitted(false)}><X /></button><div className="success-popup-icon"><Check /></div><p className="eyebrow">REQUEST RECEIVED</p><h2 id="success-title">Request Received!</h2><p>Thank you for contacting BM-Technologist. Our team will contact you as soon as possible.</p><button type="button" className="button" onClick={() => setSubmitted(false)}>Done <Check /></button></div></div>}
  </main>
}
