import { useEffect, useState } from "react";
import axios from "axios";

export default function PortfolioSection() {
  const [works, setWorks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // گرفتن پست‌ها
    axios.get("https://panel.ahangaryan.ir/wp-json/wp/v2/work?per_page=100")
      .then(res => setWorks(res.data));

    // گرفتن دسته‌بندی‌ها
    axios.get("https://panel.ahangaryan.ir/wp-json/wp/v2/work_category")
      .then(res => setCategories(res.data));
  }, []);

  return (
    <section className="portfolio-section" id="works-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header text-center">
              <h2 className="section-title">My Recent Works</h2>
              <p>We put your ideas and thus your wishes in the form of a unique web project...</p>
            </div>
          </div>
        </div>

        {/* فیلترها */}
        <div className="row">
          <div className="col-md-12">
            <div className="portfolio-filter text-center">
              <div className="button-group filter-button-group">
                <button data-filter="*" className="active">All</button>
                {categories.map(cat => (
                  <button key={cat.id} data-filter={`.${cat.slug}`}>
                    {cat.name}
                  </button>
                ))}
                <div className="active-bg"></div>
              </div>
            </div>

            {/* لیست پروژه‌ها */}
            <div className="portfolio-box">
              <div className="portfolio-sizer"></div>
              <div className="gutter-sizer"></div>

              {works.map(item => (
                <div
                  key={item.id}
                  className={`portfolio-item ${
                    item.work_category?.map(catId =>
                      categories.find(c => c.id === catId)?.slug
                    ).join(" ") || ""
                  }`}
                >
                  <div className="image-box">
                    {/* اینجا تصویر رو بعداً درست می‌کنیم */}
                    <img src="/assets/img/portfolio/placeholder.jpg" alt={item.title.rendered} />
                  </div>
                  <div className="content-box">
                    <h3 className="portfolio-title">{item.title.rendered}</h3>
                    <p>{item.acf?.subtitle}</p>
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
  );
}
