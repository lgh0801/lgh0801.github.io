import React, { FunctionComponent } from "react";
import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const Footer: FunctionComponent = function () {
    return(
        <FooterWrapper>
            제 블로그에 방문해주셔서 감사합니다. 😊            
        </FooterWrapper>
    )
}

export default Footer