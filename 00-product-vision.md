# Shelby Vinyl — Product Vision & Scope

## 1. Mục tiêu sản phẩm

**Shelby Vinyl** là một web app chia sẻ và nghe nhạc với trải nghiệm giao diện lấy cảm hứng từ máy phát đĩa than.

Người dùng có thể:
- Kết nối và xác thực ví **Petra Wallet** trên hệ **Aptos**.
- Faucet token trên **Shelbynet** qua landing page riêng để chuẩn bị cho các thao tác liên quan đến hệ Shelby.
- Upload bản nhạc của mình lên ứng dụng.
- Lưu trữ file nhạc trên **Shelby**.
- Xem danh sách các bài nhạc mình đã upload.
- Truy cập một trang cộng đồng để xem các bài nhạc public do mọi người upload.
- Nghe nhạc trên giao diện player kiểu **đĩa than / vinyl**.
- Tải xuống các bài nhạc public.

## 2. Tầm nhìn bản đầu

Bản đầu tiên không cần làm quá nhiều tính năng xã hội. Trọng tâm là:
1. **Upload được nhạc lên Shelby**.
2. **Xác thực user bằng Petra Wallet**.
3. **Hiển thị được thư viện cá nhân và thư viện cộng đồng**.
4. **Phát nhạc trên giao diện vinyl đẹp, rõ, dễ demo**.
5. **Có landing page faucet Shelbynet** để người dùng hiểu cách chuẩn bị token/testnet.

## 3. Bài toán sản phẩm đang giải quyết

App này kết hợp 3 thứ:
- **music sharing**
- **decentralized storage**
- **web3 identity**

Giá trị chính:
- Người dùng không chỉ upload nhạc lên một server truyền thống, mà lưu trữ trên Shelby.
- Mỗi bài nhạc có thể được xem như một asset do user upload thông qua wallet identity.
- Trải nghiệm nghe nhạc khác biệt nhờ UI kiểu vinyl, không giống player MP3 thông thường.

## 4. Loại user chính

### 4.1. User thường
Người dùng có Petra Wallet, muốn:
- kết nối ví
- upload nhạc
- xem nhạc của mình
- nghe / tải nhạc public

### 4.2. Admin
Người quản trị hệ thống, muốn:
- xem toàn bộ track
- kiểm duyệt nội dung
- ẩn / khóa track vi phạm
- theo dõi user và hoạt động upload

## 5. Core features

## 5.1. Wallet & identity
- Kết nối Petra Wallet.
- Verify wallet Aptos.
- Tạo user profile nội bộ cho app sau khi verify wallet.

## 5.2. Faucet landing page
- Trang giải thích vì sao cần faucet token trên Shelbynet.
- Nút dẫn tới các faucet liên quan.
- Hướng dẫn ngắn: lấy Aptos test token, lấy ShelbyUSD nếu cần, chuẩn bị ví trước khi dùng app.

## 5.3. Upload nhạc
- User chọn file nhạc.
- Nhập metadata cơ bản: title, artist, description, genre.
- Upload lên Shelby.
- Lưu metadata bài nhạc vào database của app.

## 5.4. Thư viện cá nhân
- Liệt kê các bài user đã upload.
- Trạng thái bài nhạc: processing / published / blocked.
- Cho phép mở trang chi tiết của từng bài.

## 5.5. Explore / community page
- Hiển thị danh sách bài public của mọi người.
- Có thể sắp xếp theo mới nhất hoặc nổi bật.
- Có search/filter ở giai đoạn sau.

## 5.6. Vinyl player UI
- Đĩa than quay khi đang phát nhạc.
- Ảnh cover ở giữa đĩa.
- Thanh progress.
- Play / pause / next / previous cơ bản.
- Có thể tải file public.

## 6. Out of scope cho bản đầu

Không nên làm ngay trong vòng đầu:
- Bình luận
- Playlist phức tạp
- Social feed kiểu mạng xã hội
- Royalty / revenue sharing
- NFT minting
- Streaming bitrate nâng cao
- Recommendation engine
- Hệ moderation tự động bằng AI

## 7. Giả định kỹ thuật cho MVP

- Frontend: **Next.js + React + Tailwind**
- Auth/Web3: **Petra Wallet + Aptos wallet adapter**
- Storage: **Shelby**
- Database app: **PostgreSQL**
- ORM: **Prisma**
- Backend: **Next.js API routes / route handlers** hoặc tách service Node riêng

## 8. Success criteria cho MVP

Một bản MVP được xem là thành công nếu demo được luồng sau:
1. Vào landing page.
2. Kết nối Petra Wallet.
3. Faucet token testnet theo hướng dẫn.
4. Upload một file nhạc.
5. File được lưu trên Shelby.
6. Metadata được lưu trong database app.
7. Bài hát xuất hiện ở trang **My Tracks**.
8. Nếu để public, bài hát xuất hiện ở **Explore**.
9. Có thể mở player vinyl và phát bài.
10. Có thể tải bài public xuống.

## 9. Product principles

- **Demo được sớm hơn là ôm quá nhiều tính năng.**
- **Storage on Shelby, business logic trong app DB.**
- **Wallet là định danh chính, nhưng UX phải đủ rõ với người mới.**
- **UI phải có chất riêng để tạo điểm nhớ.**
- **Admin/moderation phải được nghĩ từ sớm vì đây là app upload nhạc công khai.**
