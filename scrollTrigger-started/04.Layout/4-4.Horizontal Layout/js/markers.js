

const markers = () => {

  if (document.querySelector('.gsap-marker-scroller-start')) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    // const arr = [];
    // markers.forEach((m)=>{
    //   if(m.classList.includes('scroller')){
    //     arr.push(m);
    //   }
    // })

    const scrollMarkers = markers.filter((m)=>m.classList.includes('scroller'));

    scrollbar.addListener(({ offset }) => {
      // gsap.set(markers, { marginTop: -offset.y });

      gsap.set(scrollMarkers, { marginLeft: -offset.y });
    });
  }
}










