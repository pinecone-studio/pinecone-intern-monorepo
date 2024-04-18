import React from 'react';

type Props = {};

const bigDiv = {
  container: 'inherit',
  marginBlock: '20px',
  marginInline: '50px',
  backgroundColor: 'white',
  borderRadius: '50px',
};
const topDiv = {
  display: 'flex',
  justifyContent: 'space-between',
};

const JobDash = (props: Props) => {
  return (
    <div style={bigDiv}>
      <div style={topDiv}>
        <h1> Ажлын зар</h1>
        <button>Зар нэмэх</button>
      </div>
      <div>
        <div style={{ marginTop: '20px', borderBottom: '1px solid gray', width: '100%' }}>
          <div style={{ display: 'flex', paddingBottom: '10px', gap: '20px' }}>
            <p>Зар</p>
            <p>Ирсэн өргөдөл</p>
          </div>
        </div>
        <div style={{ marginTop: '50px', display: 'flex', gap: '10px' }}>
          <div style={{ border: '1px solid gray', width: '100%' }}>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h1>Staff Software Engineer, Machine Learning, Core</h1>
                <p>Байршил: Гурван гол оффис центр</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                <button style={{ backgroundColor: 'black', color: 'white' }}>Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
          <div style={{ border: '1px solid gray', width: '100%' }}>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h1>Staff Software Engineer, Machine Learning, Core</h1>
                <p>Байршил: Гурван гол оффис центр</p>
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                <button style={{ backgroundColor: 'black', color: 'white' }}>Дэлгэрэнгүй</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDash;
