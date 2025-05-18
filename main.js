// 2026여수세계섬박람회 - 섬 투어 미식 패스포트 JavaScript

// 문서가 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 차트 초기화
  initRoiChart();
  initRevenueChart();
  
  // 카운트업 애니메이션 초기화
  initCountUpAnimations();
  
  // 모바일 메뉴 토글
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // 여수 섹션 배경 이미지 슬라이드쇼 구현
  const heroSlideshow = document.querySelector('.hero-slideshow');
  if (heroSlideshow) {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    // 초기 슬라이드 표시
    slides[currentSlide].classList.add('active');
    
    // 슬라이드 전환 함수
    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }
    
    // 5초마다 슬라이드 전환
    setInterval(nextSlide, 5000);
  }
  
  // 현재 페이지 URL을 기반으로 네비게이션 링크에 active 클래스 추가
  const currentUrl = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentUrl.endsWith(href)) {
      link.classList.add('active');
      link.classList.add('text-secondary');
    }
  });
  
  // 패스포트 플립 애니메이션 (패스포트 페이지에서만 작동)
  const passportContainer = document.querySelector('.passport-container');
  if (passportContainer) {
    passportContainer.addEventListener('click', function() {
      const passport = this.querySelector('.passport');
      passport.style.transform = passport.style.transform === 'rotateY(180deg)' 
        ? 'rotateY(0deg)' 
        : 'rotateY(180deg)';
    });
  }
  
  // 스크롤 애니메이션
  const fadeElements = document.querySelectorAll('.fade-in');
  const slideLeftElements = document.querySelectorAll('.slide-in-left');
  const slideRightElements = document.querySelectorAll('.slide-in-right');
  
  // Intersection Observer 설정
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  // 스크롤 시 요소 페이드인
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(element);
  });
  
  // 슬라이드 애니메이션
  const slideObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateX(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  slideLeftElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateX(-50px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    slideObserver.observe(element);
  });
  
  slideRightElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateX(50px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    slideObserver.observe(element);
  });
  
  // 카운트업 애니메이션 (비즈니스 페이지의 통계를 위한)
  const countElements = document.querySelectorAll('.count-up');
  
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-count'));
        const duration = 2000; // 2초
        const step = Math.ceil(endValue / (duration / 16));
        
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current > endValue) {
            target.textContent = endValue.toLocaleString();
            clearInterval(timer);
          } else {
            target.textContent = current.toLocaleString();
          }
        }, 16);
        
        observer.unobserve(target);
      }
    });
  }, observerOptions);
  
  countElements.forEach(element => {
    countObserver.observe(element);
  });
  
  // 아일랜드 검색 기능 (islands.html 페이지용)
  const searchInput = document.getElementById('island-search');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const islandCards = document.querySelectorAll('.island-card');
      
      islandCards.forEach(card => {
        const islandName = card.querySelector('h3').textContent.toLowerCase();
        const islandDesc = card.querySelector('p').textContent.toLowerCase();
        
        if (islandName.includes(searchTerm) || islandDesc.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  
  // 섬 필터링 (islands.html 페이지용)
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        const islandCards = document.querySelectorAll('.island-card');
        
        // 모든 버튼의 활성 상태 제거
        filterButtons.forEach(btn => btn.classList.remove('bg-secondary', 'text-white'));
        
        // 현재 버튼 활성화
        this.classList.add('bg-secondary', 'text-white');
        
        islandCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else if (card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});

// ROI 도넛 차트
function initRoiChart() {
  const roiChartEl = document.getElementById('roiChart');
  if (roiChartEl) {
    new Chart(roiChartEl, {
      type: 'doughnut',
      data: {
        labels: ['초기 투자', 'ROI 성장'],
        datasets: [{
          data: [1, 8.84], // 1:8.84 비율 (884% ROI)
          backgroundColor: ['#0369A1', '#047857'],
          borderWidth: 0,
          borderRadius: 5
        }]
      },
      options: {
        cutout: '70%',
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                if (context.dataIndex === 0) {
                  return '초기 투자: 9,500만원';
                } else {
                  return '수익 증가: 8.4억원';
                }
              }
            }
          }
        }
      }
    });
  }
}

// 수익 모델 막대 그래프
function initRevenueChart() {
  const revenueChartEl = document.getElementById('revenueChart');
  if (revenueChartEl) {
    new Chart(revenueChartEl, {
      type: 'bar',
      data: {
        labels: ['패스포트 판매', '참여 업체 등록비', '프리미엄 패스포트', '한정판 패스포트', '판매 수수료', '제휴 상품', '특산물 세트', '부가 수익'],
        datasets: [{
          label: '예상 수익 (만원)',
          data: [15000, 1000, 10000, 3000, 22500, 20000, 15000, 1500],
          backgroundColor: [
            '#0369A1', '#0284c7', '#0ea5e9', 
            '#047857', '#059669', '#10b981',
            '#EA580C', '#f97316'
          ],
          borderWidth: 0,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString() + '만원';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let value = context.raw.toLocaleString();
                return context.dataset.label + ': ' + value + '만원';
              }
            }
          }
        }
      }
    });
  }
}

// 구글 지도 API 콜백 함수 (islands.html 페이지용)
function initMap() {
  const mapElement = document.getElementById('map');
  
  if (mapElement) {
    // 여수 중심 좌표
    const yeosu = { lat: 34.7604, lng: 127.6622 };
    
    const map = new google.maps.Map(mapElement, {
      zoom: 11,
      center: yeosu,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#0369A1' }]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#F3F4F6' }]
        }
      ]
    });
    
    // 섬 위치 데이터
    const islands = [
      { name: '돌산도', lat: 34.6876, lng: 127.7554, description: '돌산갓김치 체험' },
      { name: '거문도', lat: 34.0291, lng: 127.3121, description: '쑥 채취 및 쑥차, 쑥떡 체험' },
      { name: '금오도', lat: 34.5427, lng: 127.7687, description: '비렁길 트레킹과 해산물 요리' },
      { name: '낭도', lat: 34.6271, lng: 127.5419, description: '낭도 젖샘 막걸리 시음' },
      { name: '백야도', lat: 34.6645, lng: 127.4857, description: '멸치 잡기 및 요리 체험' }
    ];
    
    // 마커 추가
    islands.forEach(island => {
      const marker = new google.maps.Marker({
        position: { lat: island.lat, lng: island.lng },
        map: map,
        title: island.name,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#047857',
          fillOpacity: 0.8,
          strokeWeight: 2,
          strokeColor: '#FFFFFF'
        }
      });
      
      // 정보창 생성
      const infoWindow = new google.maps.InfoWindow({
        content: `<div class="font-bold">${island.name}</div>
                  <div>${island.description}</div>`
      });
      
      // 마커 클릭 이벤트
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }
}