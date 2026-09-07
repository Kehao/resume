/* KEIHAO PORTFOLIO · 轻量交互
   无任何依赖；无 JS 时页面内容完整可见（仅少了入场动效与计数动画）。 */
(function () {
  'use strict';

  // 1) 标记 JS 可用 → 激活 .rv 入场动画初始态（CSS 仅在 body.js 下隐藏）
  document.body.classList.add('js');

  // 2) 滚动入场：观察 .rv 元素，进入视口 85% 时加 .in
  var revealEls = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // 3) 数字递增：stats 区 [data-count] 计数动画
  var nums = document.querySelectorAll('[data-count]');
  if (nums.length && 'IntersectionObserver' in window) {
    var numIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        numIO.unobserve(en.target);
        var el = en.target;
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 900, 1); // 0.9s 完成
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); // easeOutCubic
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { numIO.observe(el); });
  }

  // 4) 导航高亮：滚动时标记当前区块
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
