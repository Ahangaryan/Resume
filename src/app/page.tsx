"use client";

import { useEffect, useState } from 'react';
import { fetchAcfOptions, fetchServices, fetchServiceById } from '../services/wordpress';
import Script from 'next/script';
import Head from 'next/head';

export default function HomePage() {
  const [acf, setAcf] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn && typeof (window as any).$.fn.magnificPopup === 'function') {
      (window as any).$('.modal-popup').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-mfp',
      });
    }
    fetchAcfOptions().then(setAcf).catch(() => setAcf(null));
    fetchServices().then(setServices).catch(() => setServices([]));
  }, []);
  return (
    <div dir="ltr" lang="en" style={{ direction: 'ltr', textAlign: 'left' }}>
      <Head>
        <link rel="icon" type="image/png" href={acf?.acf?.favicon?.url || "/favicon.ico"} />
        {/* Font Awesome CDN */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-papm6p6Q6l5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      {/* Preloader */}
      <div className="preloader">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
        </svg>
        <div className="preloader-heading">
          <div className="load-text">
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
          </div>
        </div>
      </div>

      {/* Back To Top */}
      <div className="progress-wrap" id="scrollUp">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>


  {/* Header حذف شد. در مرحله بعد هدر جدید از index.html اضافه می‌شود */}
  <header className="tj-header-area header-absolute" style={{ direction: 'ltr', textAlign: 'left' }}>
    {/* ...کد JSX هدر اینجا قرار می‌گیرد... */}
  </header>

      {/* Popup Modals */}
      <div id="service-wrapper" className="popup_content_area zoom-anim-dialog mfp-hide">
        {selectedService ? (
          <>
            <div className="popup_modal_img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
              {/* اگر تصویر شاخص وجود داشت نمایش بده */}
              {selectedService.featured_media_url ? (
                <img src={selectedService.featured_media_url} alt={selectedService.title?.rendered || ''} />
              ) : selectedService._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                <img src={selectedService._embedded['wp:featuredmedia'][0].source_url} alt={selectedService.title?.rendered || ''} />
              ) : (
                <img src="/assets/img/services/modal-img.jpg" alt="" />
              )}
            </div>
            <div className="popup_modal_content" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="service_details">
                <div className="row">
                  <div className="col-lg-7 col-xl-8">
                    <div className="service_details_content">
                      <div className="service_info">
                        <h6 className="subtitle">{selectedService.acf?.subtitle || 'Service'}</h6>
                        <h2 className="title">{selectedService.title?.rendered || ''}</h2>
                        <div className="desc" dangerouslySetInnerHTML={{__html: selectedService.content?.rendered || ''}} />
                        {/* اگر نیاز به نمایش فیلدهای بیشتر بود اینجا اضافه کن */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-xl-4">
                    <div className="tj_main_sidebar">
                      <div className="sidebar_widget services_list">
                        <div className="widget_title">
                          <h3 className="title">All Services</h3>
                        </div>
                        <ul>
                          {services.map((srv: any) => (
                            <li key={srv.id} className={srv.id === selectedService.id ? 'active' : ''}>
                              <button onClick={() => setSelectedService(srv)}>
                                {srv.acf?.fa_icon && typeof srv.acf.fa_icon === 'string' ? (
                                  <i className={
                                    srv.acf.fa_icon.includes('fa') ? srv.acf.fa_icon : `fa ${srv.acf.fa_icon}`
                                  }></i>
                                ) : (
                                  <i className="fa-solid fa-star"></i>
                                )}
                                {srv.title?.rendered || ''}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{padding:40, textAlign:'center'}}>سرویسی انتخاب نشده است.</div>
        )}
      </div>

      <div id="portfolio-wrapper" className="popup_content_area zoom-anim-dialog mfp-hide">
        <div className="popup_modal_img">
          <img src="/assets/img/portfolio/modal-img.jpg" alt="" />
        </div>
        <div className="popup_modal_content" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div className="portfolio_info">
            <div className="portfolio_info_text">
              <h2 className="title">DStudio</h2>
              <div className="desc">
                <p>They are was greater open above shelter lets itself under appear sixth open gathering made upon can&apos;t own above midst gathering gathered he one us saying can&apos;t divide.</p>
              </div>
              <a href="#" className="btn tj-btn-primary">live preview <i className="fal fa-arrow-right"></i></a>
            </div>
            <div className="portfolio_info_items">
              <div className="info_item">
                <div className="key">Category</div>
                <div className="value">Web Design</div>
              </div>
              <div className="info_item">
                <div className="key">Client</div>
                <div className="value">Artboard Studio</div>
              </div>
              <div className="info_item">
                <div className="key">Start Date</div>
                <div className="value">August 20, 2023</div>
              </div>
              <div className="info_item">
                <div className="key">Designer</div>
                <div className="value"><a href="#">ThemeJunction</a></div>
              </div>
            </div>
          </div>
          <div className="portfolio_gallery owl-carousel">
            <div className="gallery_item">
              <img src="/assets/img/portfolio-gallery/p-gallery-1.jpg" alt="" />
            </div>
            <div className="gallery_item">
              <img src="/assets/img/portfolio-gallery/p-gallery-2.jpg" alt="" />
            </div>
            <div className="gallery_item">
              <img src="/assets/img/portfolio-gallery/p-gallery-3.jpg" alt="" />
            </div>
            <div className="gallery_item">
              <img src="/assets/img/portfolio-gallery/p-gallery-4.jpg" alt="" />
            </div>
          </div>
          <div className="portfolio_description">
            <h2 className="title">Project Description</h2>
            <div className="desc">
              <p>The goal is there are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.</p>
              {/* ... ادامه توضیحات پروژه ... */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="site-content" id="content">
        {/* Hero Section */}
        <section className="hero-section d-flex align-items-center" id="intro">
          <div className="intro_text">
            <svg viewBox="0 0 1320 300">
              <text x="50%" y="50%" textAnchor="middle">{acf?.acf?.hero_svg_text || 'HI'}</text>
            </svg>
          </div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="hero-content-box">
                  <span className="hero-sub-title wow fadeInLeft" data-wow-delay="1.1s">{acf?.acf?.left_small_title_text || 'I am Hamid Ahangaryan'}</span>
                  <h1 className="hero-title wow fadeInLeft" data-wow-delay="1.2s">{acf?.acf?.left_large_title_text || <>Web Developer +<br />UI/UX Designer</>}</h1>
                  <div className="hero-image-box d-md-none text-center wow fadeInRight" data-wow-delay="1.3s">
                    <img src={acf?.acf?.right_header_photo?.url || "/assets/img/hero/me.png"} alt="" />
                  </div>
                  <p className="lead wow fadeInLeft" data-wow-delay="1.4s">{acf?.acf?.text_under_title || 'I create modern, user-focused web solutions and digital experiences for businesses and individuals.'}</p>
                  <div className="button-box d-flex flex-wrap align-items-center">
                    <a href={acf?.acf?.cv_download_url || "/assets/ahangaryan-cv.pdf"} className="btn tj-btn-secondary wow fadeInLeft" data-wow-delay="1.5s" download>{acf?.acf?.cv_button_text || "Download CV"}</a>
                    <ul className="ul-reset social-icons wow fadeInLeft" data-wow-delay="1.6s">
                      {Array.isArray(acf?.acf?.social_media) && acf.acf.social_media.length > 0 ? (
                        acf.acf.social_media.map((item: any, idx: number) => {
                          // فقط FontAwesome و فقط اگر رشته باشد
                          const iconClass = typeof item.social_icon === 'string' ? item.social_icon : '';
                          return (
                            <li key={idx}>
                              <a href={item.social_url} target="_blank" rel="noopener noreferrer">
                                <i className={iconClass}></i>
                              </a>
                            </li>
                          );
                        })
                      ) : (
                        <>
                          <li><a href="https://twitter.com/hamidahangaryan" target="_blank"><i className="fa-brands fa-twitter" ></i></a></li>
                          <li><a href="https://linkedin.com/in/hamidahangaryan" target="_blank"><i className="fa-brands fa-linkedin-in" ></i></a></li>
                          <li><a href="https://github.com/hamidahangaryan" target="_blank"><i className="fa-brands fa-github" ></i></a></li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-block">
                <div className="hero-image-box text-center wow fadeInRight heroRightImg" data-wow-delay="1.5s">
                  <img src={acf?.acf?.right_header_photo?.url || "/assets/img/hero/me.png"} alt="" />
                </div>
              </div>
            </div>
            {/* Funfacts */}
            <div className="funfact-area">
              <div className="row">
                {Array.isArray(acf?.acf?.counter) && acf.acf.counter.length > 0 ? (
                  acf.acf.counter.map((item: any, idx: number) => (
                    <div className="col-6 col-lg-3" key={idx}>
                      <div className="funfact-item d-flex flex-column flex-sm-row flex-wrap align-items-center">
                        <div className="number"><span className="odometer" data-count={item.number}>{item.number}</span></div>
                        <div className="text">{item.title}<br />{item.subtitle && <span style={{fontSize:'0.8em',color:'#888'}}>{item.subtitle}</span>}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="col-6 col-lg-3">
                      <div className="funfact-item d-flex flex-column flex-sm-row flex-wrap align-items-center">
                        <div className="number"><span className="odometer" data-count="14">0</span></div>
                        <div className="text">Years of <br />Experience</div>
                      </div>
                    </div>
                    <div className="col-6 col-lg-3">
                      <div className="funfact-item d-flex flex-column flex-sm-row flex-wrap align-items-center">
                        <div className="number"><span className="odometer" data-count="50">0</span>+</div>
                        <div className="text">Project <br />Completed</div>
                      </div>
                    </div>
                    <div className="col-6 col-lg-3">
                      <div className="funfact-item d-flex flex-column flex-sm-row flex-wrap align-items-center">
                        <div className="number"><span className="odometer" data-count="1.5">0</span>K</div>
                        <div className="text">Happy <br />Clients</div>
                      </div>
                    </div>
                    <div className="col-6 col-lg-3">
                      <div className="funfact-item d-flex flex-column flex-sm-row flex-wrap align-items-center">
                        <div className="number"><span className="odometer" data-count="14">0</span></div>
                        <div className="text">Years of <br />Experience</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section className="services-section" id="services-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header text-center">
                  <h2 className="section-title wow fadeInUp" data-wow-delay=".3s">{acf?.acf?.services_title || "My Quality Services"}</h2>
                  <p className="wow fadeInUp" data-wow-delay=".4s">{acf?.acf?.services_description || "We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers."}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="services-widget position-relative">
                  {/* Service Items */}
                  {Array.isArray(services) && services.length > 0 ? (
                    services.map((service: any, i: number) => (
                      <div key={service.id || i} className={`service-item${i === 0 ? " current" : ""} d-flex flex-wrap align-items-center wow fadeInUp`} data-wow-delay={`.${5+i}s`}>
                        <div className="left-box d-flex flex-wrap align-items-center">
                          <span className="number">{`0${i+1}`}</span>
                          <h3 className="service-title">{service.title?.rendered || service.title || ''}</h3>
                        </div>
                        <div className="right-box">
                          <p>{service.excerpt?.rendered ? service.excerpt.rendered.replace(/<[^>]+>/g, '') : ''}</p>
                        </div>
                        <i className="flaticon-up-right-arrow"></i>
                        <button
                          data-mfp-src="#service-wrapper"
                          className="service-link modal-popup"
                          onClick={async () => {
                            // سرویس را با جزئیات کامل (شامل _embedded) مجدد بگیر
                            const fullService = await fetchServiceById(service.id);
                            setSelectedService(fullService || service);
                            setTimeout(() => {
                              if (typeof window !== 'undefined' && (window as any).$) {
                                (window as any).$.magnificPopup.open({
                                  items: { src: '#service-wrapper' },
                                  type: 'inline'
                                });
                              }
                            }, 50);
                          }}
                        ></button>
                      </div>
                    ))
                  ) : (
                    <div>Loading services...</div>
                  )}
                  <div className="active-bg wow fadeInUp" data-wow-delay=".5s"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="portfolio-section" id="works-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header text-center">
                  <h2 className="section-title wow fadeInUp" data-wow-delay=".3s">{acf?.acf?.works_title || "My Recent Works"}</h2>
                  <p className="wow fadeInUp" data-wow-delay=".4s">{acf?.acf?.works_subtitle || "We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers."}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="portfolio-filter text-center wow fadeInUp" data-wow-delay=".5s">
                  <div className="button-group filter-button-group">
                    <button data-filter="*" className="active">All</button>
                    <button data-filter=".uxui">UX/UI</button>
                    <button data-filter=".branding">Branding</button>
                    <button data-filter=".mobile-app">Apps</button>
                    <div className="active-bg"></div>
                  </div>
                </div>
                <div className="portfolio-box wow fadeInUp" data-wow-delay=".6s">
                  <div className="portfolio-sizer"></div>
                  <div className="gutter-sizer"></div>
                  {/* Portfolio Items */}
                  {[
                    {cat: "branding", img: "/assets/img/portfolio/2.jpg", title: "Deloitte"},
                    {cat: "uxui", img: "/assets/img/portfolio/1.jpg", title: "New Age"},
                    {cat: "mobile-app", img: "/assets/img/portfolio/3.jpg", title: "Sebastian"},
                    {cat: "branding", img: "/assets/img/portfolio/4.jpg", title: "Mochnix"},
                  ].map((item) => (
                    <div key={item.title} className={`portfolio-item ${item.cat}`}>
                      <div className="image-box">
                        <img src={item.img} alt="" />
                      </div>
                      <div className="content-box">
                        <h3 className="portfolio-title">{item.title}</h3>
                        <p>Project was about precision and information.</p>
                        <i className="flaticon-up-right-arrow"></i>
                        <button data-mfp-src="#portfolio-wrapper" className="portfolio-link modal-popup"></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section className="resume-section" id="resume-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="section-header wow fadeInUp" data-wow-delay=".3s">
                  <h2 className="section-title">My Experience</h2>
                </div>
                <div className="resume-widget">
                  {/* Experience Items */}
                  {[
                    {time: "2022 - Present", title: "Lead Developer", inst: "Blockdots, London"},
                    {time: "2021 - 2022", title: "Full Stack Web Developer", inst: "Parsons, The New School"},
                    {time: "2020 - 2021", title: "UI Designer", inst: "House of Life, Leeds"},
                    {time: "2018 - 2020", title: "Junior Graphics Designer", inst: "Theme Junction, Bursa"},
                  ].map((item, i) => (
                    <div key={item.title} className={`resume-item wow fadeInLeft`} data-wow-delay={`.${4+i}s`}>
                      <div className="time">{item.time}</div>
                      <h3 className="resume-title">{item.title}</h3>
                      <div className="institute">{item.inst}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="section-header wow fadeInUp" data-wow-delay=".4s">
                  <h2 className="section-title">My Education</h2>
                </div>
                <div className="resume-widget">
                  {/* Education Items */}
                  {[
                    {time: "2020 - 2023", title: "Programming course", inst: "Harverd University"},
                    {time: "2016 - 2020", title: "Graphic design course", inst: "University of Denmark"},
                    {time: "2012 - 2015", title: "Web design course", inst: "University of California"},
                    {time: "2010 - 2011", title: "Design & Technology", inst: "Parsons, The New School"},
                  ].map((item, i) => (
                    <div key={item.title} className={`resume-item wow fadeInRight`} data-wow-delay={`.${5+i}s`}>
                      <div className="time">{item.time}</div>
                      <h3 className="resume-title">{item.title}</h3>
                      <div className="institute">{item.inst}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section" id="skills-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header text-center">
                  <h2 className="section-title wow fadeInUp" data-wow-delay=".3s">My Skills</h2>
                  <p className="wow fadeInUp" data-wow-delay=".4s">We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="skills-widget d-flex flex-wrap justify-content-center align-items-center">
                  {/* Skill Items */}
                  {[
                    {icon: "/assets/img/icons/figma.svg", percent: "92%", label: "Figma"},
                    {icon: "/assets/img/icons/sketch.svg", percent: "80%", label: "Sketch"},
                    {icon: "/assets/img/icons/xd.svg", percent: "85%", label: "XD"},
                    {icon: "/assets/img/icons/wp.svg", percent: "99%", label: "WordPress"},
                    {icon: "/assets/img/icons/react.svg", percent: "89%", label: "React"},
                    {icon: "/assets/img/icons/js.svg", percent: "93%", label: "JavaScript"},
                  ].map((item, i) => (
                    <div key={item.label} className={`skill-item wow fadeInUp`} data-wow-delay={`.${3+i}s`}>
                      <div className="skill-inner">
                        <div className="icon-box">
                          <img src={item.icon} alt="" />
                        </div>
                        <div className="number">{item.percent}</div>
                      </div>
                      <p>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonial-section" id="testimonials-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="section-header">
                  <h2 className="section-title wow fadeInLeft" data-wow-delay=".3s">My Client&apos;s Stories</h2>
                  <p className="wow fadeInLeft" data-wow-delay=".4s">Empowering people in new a digital journey with my super services</p>
                </div>
              </div>
              <div className="col-lg-7 col-xl-6 offset-xl-1">
                <div className="testimonials-widget wow fadeInRight" data-wow-delay=".5s">
                  <div className="owl-carousel testimonial-carousel">
                    {/* Testimonial Items */}
                    {[
                      {logo: "/assets/img/testimonials/logo/1.png", user: "/assets/img/testimonials/user/1.jpg", quote: "Taylor is a professional Designer he really helps my business by providing value to my business.", name: "Brandon Fraser", role: "Senior Software Dev, Cosmic Sport"},
                      {logo: "/assets/img/testimonials/logo/2.png", user: "/assets/img/testimonials/user/2.jpg", quote: "Taylor is a professional Designer he really helps my business by providing value to my business.", name: "Tim Bailey", role: "SEO Specialist, Theme Junction"},
                    ].map((item) => (
                      <div key={item.name} className="testimonial-item">
                        <div className="top-area d-flex flex-wrap justify-content-between">
                          <div className="logo-box"><img src={item.logo} alt="" /></div>
                          <div className="image-box"><img src={item.user} alt="" /></div>
                        </div>
                        <div className="icon-box">{/* ...SVG icons... */}</div>
                        <p className="quote">“{item.quote}”</p>
                        <h4 className="name">{item.name}</h4>
                        <span className="designation">{item.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="blog-section" id="blog-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header text-center">
                  <h2 className="section-title wow fadeInUp" data-wow-delay=".3s">Recent Blogs</h2>
                  <p className="wow fadeInUp" data-wow-delay=".4s">We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
                </div>
              </div>
            </div>
            <div className="row">
              {/* Blog Items */}
              {[
                {img: "/assets/img/blog/1.jpg", cat: "Tutorial", date: "Oct 01, 2022", title: "top 10 ui ux designers"},
                {img: "/assets/img/blog/2.jpg", cat: "TIPS", date: "Nov 01, 2022", title: "App Development Guides"},
                {img: "/assets/img/blog/3.jpg", cat: "FREEBIES", date: "Dec 01, 2022", title: "learn graphic design free"},
              ].map((item, i) => (
                <div key={item.title} className="col-lg-4 col-md-6">
                  <div className="blog-item wow fadeInUp" data-wow-delay={`.${5+i}s`}>
                    <div className="blog-thumb">
                      <a href="#"><img src={item.img} alt="" /></a>
                      <a href="#" className="category">{item.cat}</a>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <ul className="ul-reset">
                          <li><i className="fa-light fa-calendar-days"></i> {item.date}</li>
                          <li><i className="fa-light fa-comments"></i> <a href="#">Comment (0)</a></li>
                        </ul>
                      </div>
                      <h3 className="blog-title"><a href="#">{item.title}</a></h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 order-2 order-md-1">
                <div className="contact-form-box wow fadeInLeft" data-wow-delay=".3s">
                  <div className="section-header">
                    <h2 className="section-title">{acf?.acf?.contact_title || "Let’s work together!"}</h2>
                    <p>{acf?.acf?.contact_description || "I design and code beautifully simple things and I love what I do. Just simple like that!"}</p>
                  </div>
                  <div className="tj-contact-form">
                    <form action="#">
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form_group">
                            <input type="text" name="fname" id="fname" placeholder="First name" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_group">
                            <input type="text" name="lname" id="lname" placeholder="Last name" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_group">
                            <input type="email" name="email" id="email" placeholder="Email address" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_group">
                            <input type="tel" name="phone" id="phone" placeholder="Phone number" autoComplete="off" />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form_group">
                            <select name="service" id="service" className="tj-nice-select">
                              <option value="" disabled>Choose Service</option>
                              <option value="branding">Branding Design</option>
                              <option value="web">Web Design</option>
                              <option value="uxui">UI/UX Design</option>
                              <option value="app">App Design</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form_group">
                            <textarea name="message" id="message" placeholder="Message"></textarea>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form_btn">
                            <button type="submit" className="btn tj-btn-primary">Send Message</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1 col-md-5 d-flex flex-wrap align-items-center order-1 order-md-2">
                <div className="contact-info-list">
                  <ul className="ul-reset">
                    <li className="d-flex flex-wrap align-items-center position-relative wow fadeInRight" data-wow-delay=".4s">
                      <div className="icon-box"><i className="flaticon-phone-call"></i></div>
                      <div className="text-box">
                        <p>Phone</p>
                        <a href={`tel:${acf?.acf?.contact_phone || "0123456789"}`}>{acf?.acf?.contact_phone || "+01 123 654 8096"}</a>
                      </div>
                    </li>
                    <li className="d-flex flex-wrap align-items-center position-relative wow fadeInRight" data-wow-delay=".5s">
                      <div className="icon-box"><i className="flaticon-mail-inbox-app"></i></div>
                      <div className="text-box">
                        <p>Email</p>
                          {acf?.acf?.email ? (
                            <a href={`mailto:${acf.acf.email}`} className="d-flex align-items-center h-100">
                              {acf.acf.email}
                            </a>
                          ) : (
                            <a href={`mailto:gerolddesign@mail.com`}>gerolddesign@mail.com</a>
                          )}
                      </div>
                    </li>
                    <li className="d-flex flex-wrap align-items-center position-relative wow fadeInRight" data-wow-delay=".6s">
                      <div className="icon-box"><i className="flaticon-location"></i></div>
                      <div className="text-box">
                        <p>Address</p>
                        <a href="#">{acf?.acf?.contact_address || "Warne Park Street Pine, FL 33157, New York"}</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="tj-footer-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="footer-logo-box">
                <a href="#"><img src={acf?.acf?.logo?.url || "/assets/img/logo/logo.png"} alt="Hamid Ahangaryan Logo" /></a>
              </div>
              <div className="footer-menu">
                <nav>
                  <ul>
                    <li><a href="#services-section">Services</a></li>
                    <li><a href="#works-section">Works</a></li>
                    <li><a href="#resume-section">Resume</a></li>
                    <li><a href="#skills-section">Skills</a></li>
                    <li><a href="#testimonials-section">Testimonials</a></li>
                    <li><a href="#contact-section">Contact</a></li>
                  </ul>
                </nav>
              </div>
              <div className="copy-text">
                <p>&copy; 2025 All rights reserved by Hamid Ahangaryan</p>
              </div>
            </div>
          </div>
        </div>

      </footer>

      {/* Scripts */}
      <Script src="/assets/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/nice-select.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/backToTop.js" strategy="afterInteractive" />
      <Script src="/assets/js/smooth-scroll.js" strategy="afterInteractive" />
      <Script src="/assets/js/appear.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/gsap.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/one-page-nav.js" strategy="afterInteractive" />
      <Script src="/assets/js/lightcase.js" strategy="afterInteractive" />
      <Script src="/assets/js/owl.carousel.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/odometer.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/magnific-popup.js" strategy="afterInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </div>
  );
}
