// 패스포트 애니메이션 처리 스크립트
document.addEventListener('DOMContentLoaded', function() {
  // SVG 패스포트 요소 가져오기
  const passportSvg = document.querySelector('.passport-svg-container svg');
  const passportContainer = document.querySelector('.passport-container');
  
  if (passportSvg && passportContainer) {
    // SVG 내부 요소 접근
    const svgDoc = passportSvg.contentDocument;
    
    // SVG가 로드된 후 처리
    passportSvg.addEventListener('load', function() {
      const svgDoc = passportSvg.contentDocument;
      
      if (svgDoc) {
        // SVG 내부 컨테이너 요소 찾기
        const passportContainerInSvg = svgDoc.getElementById('passport-container');
        
        if (passportContainerInSvg) {
          // 클릭 이벤트 리스너 추가
          passportContainerInSvg.addEventListener('click', function() {
            // 외부 컨테이너에 clicked 클래스 토글
            passportContainer.classList.toggle('clicked');
          });
        }
      }
    });
    
    // 패스포트 컨테이너 클릭 이벤트
    passportContainer.addEventListener('click', function() {
      this.classList.toggle('clicked');
    });
  }
  
  // 모바일 메뉴 토글
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // 히어로 섹션 슬라이드쇼
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  
  if (heroSlides.length > 0) {
    // 첫 번째 슬라이드 활성화
    heroSlides[0].classList.add('active');
    
    // 슬라이드 전환 함수
    function nextSlide() {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }
    
    // 7초마다 슬라이드 전환
    setInterval(nextSlide, 7000);
  }
  
  // 카운트업 애니메이션
  const countElements = document.querySelectorAll('.count-up');
  
  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000; // 2초
    const frameRate = 30; // 초당 프레임 수
    const totalFrames = duration / 1000 * frameRate;
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(progress * target);
      
      if (frame === totalFrames) {
        clearInterval(counter);
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = currentCount.toLocaleString();
      }
    }, 1000 / frameRate);
  }
  
  // 관찰자 API를 사용하여 요소가 뷰포트에 들어올 때 애니메이션 시작
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  countElements.forEach(el => {
    observer.observe(el);
  });
});
