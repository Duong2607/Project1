export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', menus: [
            {
                name: 'Quản lý',
                subMenus: [
                    { name: 'Quản lý người dùng', link: '/system/user-manage' },
                    { name: 'Quản lý sản phẩm', link: '/system/product-manage' },
                    { name: 'Quản lý đơn hàng', link: '/system/order-manage' },
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];