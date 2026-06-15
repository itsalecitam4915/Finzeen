const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add('reveal');

        }

    });

},{
    threshold:0.1
});

document.querySelectorAll('.animate-on-scroll, .intro-section')
.forEach((el,index)=>{

    el.style.transition = `
        opacity .8s ease,
        transform .8s ease
    `;

    el.style.transitionDelay = `${index * 0.08}s`;

    observer.observe(el);

});

/* =========================
   MOSTRAR / OCULTAR INFO
========================= */

function toggleInfo(button){

    /* CONTENEDOR DEL BOTÓN */
    const container = button.parentElement;

    /* PANEL RELACIONADO */
    const infoBox = container.querySelector('.info-extra');

    /* TOGGLE */
    if(infoBox.style.display === "block"){

        infoBox.style.display = "none";

    }else{

        infoBox.style.display = "block";

    }

}