import './Techs.css';

function Techs() {
  return (
  <section className='techs'>
    <div className='techs__container'>
      <h2 className='main__title'>Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__definition'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className='techs__blocks'>
        <div className='techs__block'><p className='techs__block-text'>HTML</p></div>
        <div className='techs__block'><p className='techs__block-text'>CSS</p></div>
        <div className='techs__block'><p className='techs__block-text'>JS</p></div>
        <div className='techs__block'><p className='techs__block-text'>React</p></div>
        <div className='techs__block'><p className='techs__block-text'>Git</p></div>
        <div className='techs__block'><p className='techs__block-text'>Express.js</p></div>
        <div className='techs__block'><p className='techs__block-text'>mongoDB</p></div>
      </div>
    </div>
  </section>
  );
}

export default Techs;