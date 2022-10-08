import React from "react";
 import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <>
  
<footer class="footer-distributed">

			<div class="footer-left">

				<h4>Er. <span>Manish Gupta</span></h4>

				<p class="footer-links">
					<Link class="link-1">Home</Link>
					
					<Link>Blog</Link>
				
					<Link>Pricing</Link>
				
					<Link>About</Link>
					
					<Link>Faq</Link>
					
					<Link>Contact</Link>
				</p>

				<p class="footer-company-name">Company Name © 2020</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>Patna,Bihar-India</span> Chhoti nagla patna city</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+6205988966</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><Link href="mailto:support@company.com">support@company.com</Link></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

				<div class="footer-icons">

					<Link><i class="fa fa-facebook"></i></Link>
					<Link><i class="fa fa-twitter"></i></Link>
					<Link><i class="fa fa-linkedin"></i></Link>
					<Link><i class="fa fa-github"></i></Link>

				</div>

			</div>

		</footer>
      
    </>
  );
};

export default Footer;