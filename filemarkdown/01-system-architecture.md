# Shelby Vinyl — System Architecture

## 1. Kiến trúc tổng thể

Hệ thống nên được chia thành 5 khối chính:

1. **Frontend Web App**
2. **Wallet/Auth Layer**
3. **Application Backend**
4. **Database**
5. **Shelby Storage Layer**

Luồng tổng quát:

```text
User
  -> Frontend (Next.js)
  -> Connect Petra Wallet
  -> Backend API
  -> Database (metadata, users, roles)
  -> Shelby (audio/blob storage)
```

## 2. Vai trò từng lớp

## 2.1. Frontend
Chịu trách nhiệm:
- landing page
- faucet guide page
- connect wallet UI
- upload form
- my tracks page
- explore page
- track detail page
- vinyl music player
- admin dashboard cơ bản

## 2.2. Wallet/Auth layer
Chịu trách nhiệm:
- kết nối Petra Wallet
- lấy địa chỉ ví Aptos
- sign message để verify wallet ownership
- gửi signature về backend để tạo session/app user

Lưu ý:
- **wallet address** nên là định danh người dùng cấp 1
- backend vẫn cần session/token riêng để quản lý app

## 2.3. Backend
Chịu trách nhiệm:
- verify signature từ Petra Wallet
- tạo / cập nhật user profile
- nhận metadata upload
- validate file upload
- tương tác với Shelby SDK/API
- lưu metadata track vào DB
- cung cấp API cho My Tracks / Explore / Admin
- kiểm soát visibility và moderation

## 2.4. Database
Chịu trách nhiệm:
- user data
- role data
- track metadata
- trạng thái bài hát
- log hoạt động admin
- moderation/report data

## 2.5. Shelby
Chịu trách nhiệm:
- lưu file nhạc
- lưu cover image (nếu muốn)
- cung cấp khả năng download/read blob

## 3. Quyết định kiến trúc quan trọng

## 3.1. Shelby chỉ giữ file, không giữ toàn bộ business logic
Shelby là storage layer.

App database sẽ giữ các trường nghiệp vụ như:
- title
- artist
- owner
- visibility
- status
- featured flag
- timestamps
- report count

## 3.2. Database của app là nguồn truy vấn chính cho UI
Các trang như:
- My Tracks
- Explore
- Admin list

nên query từ DB app thay vì truy vấn trực tiếp Shelby mỗi lần.

Lý do:
- query nhanh hơn
- dễ filter/sort
- dễ gắn moderation/business rules
- không phụ thuộc trực tiếp vào storage layer trong mọi màn hình

## 3.3. Upload nhạc nên đi qua backend ở bản đầu
Không nên để browser ôm hết logic upload ngay trong version đầu.

Lợi ích:
- backend kiểm tra file type/size
- dễ log lỗi
- dễ quản lý API key / secrets / business flow
- dễ mở rộng sang queue/transcoding sau này

## 4. Flow xác thực ví

```text
1. User bấm Connect Wallet
2. Frontend kết nối Petra Wallet
3. Frontend yêu cầu nonce từ backend
4. User ký message bằng Petra Wallet
5. Frontend gửi address + signature + nonce về backend
6. Backend verify
7. Backend tạo session/token cho app
8. User được đăng nhập
```

## 5. Flow upload bài nhạc

```text
1. User đăng nhập bằng Petra Wallet
2. User vào trang Upload
3. Chọn file nhạc + nhập metadata
4. Frontend gửi request upload tới backend
5. Backend validate file và metadata
6. Backend tạo record Track với status = processing
7. Backend upload file lên Shelby
8. Backend nhận blob info / identifier
9. Backend lưu blob reference vào DB
10. Backend đổi status = published
11. Nếu visibility = public -> hiện trên Explore
```

## 6. Flow phát nhạc

Nên chọn một trong hai hướng sau:

### Hướng A — frontend đọc trực tiếp từ storage
Đơn giản hơn, nhanh làm demo.

### Hướng B — backend stream proxy
Tốt hơn cho production vì:
- ẩn chi tiết storage
- kiểm soát quyền truy cập
- dễ log analytics
- dễ chặn bài bị khóa

**Khuyến nghị:**
- MVP có thể bắt đầu với A nếu cần tốc độ.
- Nhưng cấu trúc code nên mở đường để chuyển sang B.

## 7. Flow trang Explore

```text
1. Frontend gọi API /tracks/explore
2. Backend query DB:
   - visibility = public
   - status = published
3. Trả danh sách track metadata
4. Frontend render grid/list
5. User click vào track để mở player
```

## 8. Flow trang My Tracks

```text
1. Frontend gọi API /me/tracks
2. Backend lấy user từ session
3. Query DB theo owner_user_id
4. Trả danh sách bài của user
5. Frontend hiển thị thư viện cá nhân
```

## 9. Phân quyền

## 9.1. User
- connect wallet
- upload track
- xem track của mình
- sửa metadata cơ bản của track mình
- đặt public/private
- nghe và tải track public

## 9.2. Admin
- xem toàn bộ tracks
- ẩn / khóa / gỡ track
- xem danh sách user
- theo dõi report
- can thiệp moderation

## 10. Đề xuất database schema mức khái niệm

## 10.1. users
- id
- wallet_address
- username
- display_name
- avatar_url
- role
- status
- created_at
- updated_at

## 10.2. auth_nonces
- id
- wallet_address
- nonce
- expires_at
- used_at

## 10.3. tracks
- id
- owner_user_id
- title
- artist_name
- description
- genre
- visibility
- status
- duration_seconds
- created_at
- updated_at

## 10.4. track_assets
- id
- track_id
- asset_type
- blob_name
- content_type
- size_bytes
- checksum
- created_at

## 10.5. moderation_reports
- id
- track_id
- reporter_user_id
- reason
- status
- created_at

## 10.6. admin_actions
- id
- admin_user_id
- target_type
- target_id
- action
- note
- created_at

## 11. Các route nên có ở MVP

### Public pages
- `/`
- `/faucet`
- `/explore`
- `/tracks/[id]`

### Authenticated pages
- `/upload`
- `/me/tracks`
- `/settings/profile`

### Admin pages
- `/admin`
- `/admin/tracks`
- `/admin/users`
- `/admin/reports`

## 12. Rủi ro kỹ thuật cần nhớ

### 12.1. Copyright / moderation
App công khai upload nhạc sẽ có rủi ro vi phạm bản quyền.
Cần ít nhất:
- report flow
- hide/unpublish flow
- admin controls

### 12.2. Chi phí và quota
Cần xác định rõ:
- ai trả chi phí lưu trữ
- app có giới hạn dung lượng upload mỗi user hay không
- có rate limit hay không

### 12.3. File lớn / streaming
Audio file có thể chưa quá nặng như video, nhưng vẫn cần nghĩ tới:
- thời gian upload
- retry
- timeout
- range streaming về sau

### 12.4. Testnet instability
Nếu đang build trên Shelbynet/testnet, hệ thống có thể chưa ổn định hoàn toàn.
Cấu trúc code phải cho phép thay config/network dễ dàng.
