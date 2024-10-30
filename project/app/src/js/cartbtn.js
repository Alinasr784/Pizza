import React, { useRef, useEffect } from 'react';
import '../css/cartBtn.css';

function CartBtn() {
  const cartRef = useRef(null);
  const pressTimer = useRef(null);

  useEffect(() => {
    const cart = cartRef.current;
    let offsetX, offsetY;

    const startDrag = (e) => {
      // منع التمرير الافتراضي على الشاشات اللمسية
      e.preventDefault();

      offsetX = e.clientX ? e.clientX - cart.getBoundingClientRect().left : e.touches[0].clientX - cart.getBoundingClientRect().left;
      offsetY = e.clientY ? e.clientY - cart.getBoundingClientRect().top : e.touches[0].clientY - cart.getBoundingClientRect().top;

      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', onDrag, { passive: false });
      document.addEventListener('touchend', stopDrag);
    };

    const onDrag = (e) => {
      const x = (e.clientX ? e.clientX : e.touches[0].clientX) - offsetX;
      const y = (e.clientY ? e.clientY : e.touches[0].clientY) - offsetY;

      cart.style.left = `${x}px`;
      cart.style.top = `${y}px`;
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDrag);
    };

    const longPressHandler = (e) => {
      e.preventDefault();
      pressTimer.current = setTimeout(() => {
        startDrag(e);
      }, 800); // مدة الضغط الطويل
    };

    const clearLongPress = () => {
      clearTimeout(pressTimer.current);
    };

    cart.addEventListener('touchstart', longPressHandler, { passive: false });
    cart.addEventListener('touchend', clearLongPress);
    cart.addEventListener('mousedown', longPressHandler);
    cart.addEventListener('mouseup', clearLongPress);

    return () => {
      cart.removeEventListener('touchstart', longPressHandler);
      cart.removeEventListener('touchend', clearLongPress);
      cart.removeEventListener('mousedown', longPressHandler);
      cart.removeEventListener('mouseup', clearLongPress);
    };
  }, []);

  return (
    <div className="cart" ref={cartRef}>
      <div>
        <img src="/cart.svg" alt="Cart Icon" />
      </div>
    </div>
  );
}

export default CartBtn;