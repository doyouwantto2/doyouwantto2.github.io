## Banner: done

## orb formular

Gọi orbPosition là tọa độ gốc tại điểm 0, 0. Làm sao để các phần tử có thể chia đều vị trí sao cho nằm vừa gọn với góc 90 độ.

Giờ giả sử ta có n orb thì 90 độ chia cho N orb thì sẽ là 90 / N là không gian được phép chiếm. Trong đó vùng chiếm được tính từ gốc tọa độ cho tới tiếp tuyến, tức tại bán kính của Child orb.

Cơ mà nếu thế thì trước khi tính tới bán kính của ChildOrb thì ta nên cho vị trí item đặt ở chính giữa của mỗi vùng chiếm được.

Nếu vị trí gốc tọa độ đặt tại x_0 và y_0 thì ta có xác định vị trí nhưng ta chưa xác định được bán kính của MainOrb.

Vậy giờ thì chúng ta có hai loại bán kính, thứ nhất là bán kính của mainorb và thứ hai là childorb. Nếu thế thì ta nên đặt hai đại lượng. Thứ nhất là R_m và R_c.

Trong đó: 
- R_m: Bán kính của MainOrb
- R_c: Bán kính của ChildOrb

Nhưng ta chỉ sử dụng 1 / 4 góc của MainOrb. Căn cứ theo hệ tọa độ thì ta có vị trí quay từ phải qua trái theo góc phần tư. Trong đó vị trí góc mà ta đề cập tới sẽ di chuyển từ $$0$$ đến $$\pi/2$$. 

Đơn vị cơ bản nhất để ta cộng thêm và xác định của mỗi khoảng là $$\pi/(2*n)$$. Muốn biết nó nằm tại vị trí thứ mấy trong khoảng nào thì ta lấy $$\pi/(2*n)$$ trong đó n được tính từ 1. 

Giả sử nếu chia làm 3 vùng thì sẽ có 2 vạch kẻ chính để ta phân chia ra. Nhưng ta có thể coi N ở đây tương ứng với số ChildOrb, sử dụng nguyên tắc của trò chơi chia thanh ngôi sao trong toán rời rạc.

Liệu ta nên sử dụng sin, cos hay gom lại chung thành tan.

Nếu muốn xác định tâm của vùng do ChildOrb chiếm thì ta cộng mặt trên và mặt dưới chia đôi ra.

Nếu $$\pi/(2*m)$$ với m là vị trí hiện tại thì vị trí trung tâm trong đoạn m sẽ là $$(0 + \pi/(2*(m))) / 2$$

Nếu m = 1 thì ta có trường hợp cơ sở là pi / 4, nhưng nếu m = 2 thì làm sao ta xác định được. Có lẽ ta đang gom chung hai đại lượng là n và m. Với n là số lượng ChildOrb trong khi m là thú tự của Orb. Trong đó m <= n.

Nếu vậy thì ta nên xét thế nào? Giả sử toàn bộ vùng được chia đều ra, trong đó mỗi nơi sẽ có góc bao phủ là $$\pi/(2*n)$$

Vậy thì trung tâm của mỗi điểm là gì? Nếu n = 1 thì ta hiểu rằng ta sẽ chia đôi nó ra. Tóm lại là vẫn phải cộng lại chia đôi. Nếu m là số thứ tự của ChildOrb thì ta nên cộng từ $$0$$. Khi đó $$((\pi/(2*n))*(m-1) + (\pi/(2*n)*(m))) / 2$$

Công thức sau khi được rút gọn:

$$
\frac{(2m - 1)\pi}{4n}
$$

## Profile
 ### Tag
 ### Social information
## Search


