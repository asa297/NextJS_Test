import styled from 'styled-components'
import numeral from 'numeral'

export default ({ items = [], grandTotal, price, Change, ...rest }) => {
  return (
    <Container>
      <BackgroundContainer>
        <LeftContainer>
          <LogoContainer>
            <LogoImage src="/static/images/customerDisplay/logo.png" />
          </LogoContainer>
          <TextBarContainer>
            <TextBarImage src="/static/images/customerDisplay/textbar.png" />
          </TextBarContainer>

          <AdsContainer />
        </LeftContainer>
        <RightContainer>
          <ListContainer>
            <ListFlex>
              <ProductList>
                <h2
                  style={{
                    marginTop: '20px',
                  }}
                >
                  PRODUCT
                </h2>

                {items.map(({ item, item_price }, index) => {
                  if (index <= 4) {
                    return (
                      <div key={index} style={{ marginLeft: '15px', width: '90%' }}>
                        <h4
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '26px',
                          }}
                        >
                          <div
                            style={{
                              width: '60%',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item}
                          </div>
                          <div>{numeral(item_price).format('0,0.00')} ฿</div>
                        </h4>
                      </div>
                    )
                  } else {
                    return false
                  }
                })}
              </ProductList>

              <FlexCenter>
                <h3
                  style={{
                    marginTop: '20px',
                    width: '55%',
                  }}
                >
                  TOTAL
                </h3>
                <GrandTotalContainer>{numeral(grandTotal).format('0,0.00')} ฿</GrandTotalContainer>
              </FlexCenter>

              <FlexCenter>
                <h3
                  style={{
                    marginTop: '20px',
                    width: '55%',
                  }}
                >
                  CASH
                </h3>
                <PriceContainer>{numeral(price).format('0,0.00')} ฿</PriceContainer>
              </FlexCenter>

              <FlexCenter>
                <h3
                  style={{
                    marginTop: '20px',
                    width: '55%',
                  }}
                >
                  CHANGE
                </h3>
                <ChangeContainer>{numeral(Change).format('0,0.00')} ฿</ChangeContainer>
              </FlexCenter>

              <div style={{ height: '16%' }} />
              <ThanksContainer>
                <ThanksImage src="/static/images/customerDisplay/thanks.png" />
              </ThanksContainer>
            </ListFlex>
          </ListContainer>
        </RightContainer>
      </BackgroundContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  font-family: 'Kanit';
`

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/static/images/customerDisplay/background.png');
  background-size: 100% 100%;
  display: flex;
`

const LeftContainer = styled.div`
  width: 70%;
  margin-top: 2%;
`

const RightContainer = styled.div`
  width: 30%;
  margin-top: 2%;
`

const LogoContainer = styled.div`
  height: 17%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const LogoImage = styled.img`
  width: 20%;
  height: 100%;
`

const TextBarContainer = styled.div`
  height: 6%;
  width: 95%;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

const TextBarImage = styled.img`
  width: 100%;
  height: 100%;
`
const AdsContainer = styled.div`
  height: 70%;
  width: 95%;
  background-color: red;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

const ListContainer = styled.div`
  background-color: #efe6c9;
  width: 95%;
  height: 96%;
  border-radius: 50px 50px 50px 50px;
`

const ListFlex = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ProductList = styled.div`
  height: 50%;
`

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`

const GrandTotalContainer = styled.div`
  width: 40%;
  text-align: right;
  font-size: 30px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const PriceContainer = styled.div`
  width: 40%;
  text-align: right;
  font-size: 30px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ChangeContainer = styled.div`
  width: 40%;
  text-align: right;
  font-size: 30px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ThanksContainer = styled.div`
  height: 7%;
  display: flex;
  justify-content: center;
`

const ThanksImage = styled.img`
  width: 80%;
`
