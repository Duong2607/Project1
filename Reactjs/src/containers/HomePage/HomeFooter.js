import React, { Component } from 'react';
import './HomeFooter.scss'

class HomeFooter extends Component {
    render() {
        return (
            <div className='footer'>
                <div className='main-footer p-4  '>
                    <div className='mt-5 message sm:w-2/3 py-3'>
                        <h2>SSSTUTTER</h2> 
                        <p>Với thông điệp "Refined Life", 
                        SSStutter mong muốn đem đến cho 
                        khách hàng một lối sống tinh gọn 
                        bằng các sản phẩm thời trang tinh tế.</p>
                        
                    </div>
                    <div className='mt-5 message sm:w-2/3 py-3'>
                        <h2>CHI NHÁNH HÀ NỘI</h2> 
                        <p>105 - D6, ngõ 4B Đặng Văn Ngữ
                        70 Tô Hiến Thành
                        167 Cầu Giấy
                        46 Đông Các</p>
                        
                    </div>
                    <div className='mt-5 message sm:w-2/3 py-3'>
                        <h2>CHI NHÁNH TP. HỒ CHÍ MINH</h2> 
                        <p>Lầu 1, số 25, Nguyễn Trãi, Q1
                        152 Nguyễn Gia Trí, Bình Thạnh</p>
                        
                    </div>
                    <div className='mt-5 message sm:w-2/3 py-3'>
                        <h2>CHÍNH SÁCH</h2> 
                        <p>Hướng dẫn đổi trả</p>
                        <p>LIÊN HỆ</p>
                        <ul>
                            <li>
                                info@ssstutter.com
                            </li>
                            <li>
                                0869936266
                            </li>
                        </ul>
                        <h2 >SOCIAL</h2>
                        <ul className='social-network'>
                            <li><i class="fab fa-facebook-square"></i></li>
                            <li><i class="fab fa-instagram"></i></li>
                            <li><i class="fab fa-youtube"></i></li>
                            <li><i class="fab fa-tiktok"></i></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        )
        
    }
}

export default HomeFooter
