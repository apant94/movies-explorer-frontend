import './AboutProject.css';

function AboutProject() {
  return (
  <section className='aboutproject'>
    <h2 className='aboutproject__title'>О проекте</h2>
    <div className='aboutproject__container'>
      <div className='aboutproject__column'>
        <h3 className='aboutproject__subtitle'>Дипломный проект включал 5 этапов</h3>
        <p className='aboutproject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className='aboutproject__column'>
        <h3 className='aboutproject__subtitle'>На выполнение диплома ушло 5 недель</h3>
        <p className='aboutproject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </div>
    <div className='aboutproject__progress'>
      <div className='aboutproject__progress-item'>
        <p className='aboutproject__progress-weeks'>1 неделя</p>
        <span className='aboutproject__progress-definition'>Back-end</span>
      </div>
      <div className='aboutproject__progress-item'>
        <p className='aboutproject__progress-weeks'>4 недели</p>
        <span className='aboutproject__progress-definition'>Front-end</span>
      </div>
    </div>
  </section>
  );
}

export default AboutProject;