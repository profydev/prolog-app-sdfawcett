import style from "./testimonials.module.scss";

type Customer = {
  name: string;
  title: string;
  avatar: string;
  category: string;
  testimonial: string;
};

interface TestimonialProps {
  testimonials: Customer[];
}

export const Testimonials = ({ testimonials }: TestimonialProps) => {
  return (
    <div className={style.testimonialCards}>
      {testimonials.map((customer) => (
        <div key={customer.name} className={style.customer}>
          <div>
            <h3 className={style.customerCategory}>{customer.category}</h3>
            <p className={style.customerText}>{customer.testimonial}</p>
          </div>

          <div className={style.customerInfo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={customer.avatar} alt={`${customer.name} avatar`}></img>
            <p className={style.customerName}>{customer.name}</p>
            <p className={style.customerTitle}>{customer.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
