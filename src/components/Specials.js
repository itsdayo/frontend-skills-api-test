import React, { useEffect } from "react";
import "./../style.css";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getSpecials } from "../actions/specials";
import { useHistory } from "react-router-dom";
const SpecialsList = styled.div`
  margin: auto;
  width: 50%;
  border: 3px solid #000 !important;
  margin-top: 35px;
  padding-bottom: 5px;
`;

const SpecialsCard = styled.div`
  width: 665px;
  border: 1px solid blue !important;
  margin-left: 10px;
  margin-top: 7px;
`;

const TitleContainer = styled.div`
  margin: auto;
  width: 50%;
  margin-top: 10px;
`;

const Title = styled.div``;
const TextContainer = styled.div`
  margin: auto;
  width: 70%;
  margin-top: 10px;
`;
const TypeContainer = styled.div`
  margin: auto;
  width: 50%;
  margin-top: 10px;
`;
const CodeContainer = styled.div`
  margin: auto;
  width: 65%;
  margin-top: 10px;
`;

const Text = styled.div``;
const Type = styled.div``;
const Code = styled.div``;
const Button = styled.button``;

function Specials() {
  const dispatch = useDispatch();
  const specials = useSelector((state) => state.specials);
  const history = useHistory();
  useEffect(() => {
    dispatch(getSpecials());
  }, []);

  function navigateToHomePage() {
    history.push("/");
  }
  return (
    <React.Fragment>
      <Button className="btn btn-secondary" onClick={navigateToHomePage}>
        Back
      </Button>
      <SpecialsList>
        {specials &&
          specials.specialsList.map((item, index) => (
            <SpecialsCard>
              <TitleContainer>
                <Title className="text-center"> {item.title}</Title>
              </TitleContainer>
              <TextContainer>
                <Text className="text-center">{item.text}</Text>
              </TextContainer>
              <TypeContainer>
                <Type className="text-center">type: {item.type}</Type>
              </TypeContainer>
              <CodeContainer>
                <Code className="text-center">use code {item.code}</Code>
              </CodeContainer>
            </SpecialsCard>
          ))}
      </SpecialsList>
    </React.Fragment>
  );
}

export default Specials;
