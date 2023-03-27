import React from "react";
import "../styles/footer.css";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "white", 
                   textAlign: "center", 
                   marginTop: "-50px" ,
                   marginBottom: "1rem",}}>
        Sunra Shop
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Quienes Somos</Heading>
            <FooterLink href="/about">Mision</FooterLink>
            <FooterLink href="/about">Vision</FooterLink>
            <FooterLink href="/about">Testimonios</FooterLink>
          </Column>
          <Column>
            <Heading>Servicios</Heading>
            <FooterLink href="/service">Postventa</FooterLink>
            <FooterLink href="/service">Logistica</FooterLink>
            <FooterLink href="/service">Patentamiento</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="/contact">Escribinos</FooterLink>
            <FooterLink href="/contact">Telefonos</FooterLink>
            <FooterLink href="/contact">Locales</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Whatsapp
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  )
};

export default Footer;
