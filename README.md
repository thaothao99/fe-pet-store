
## Cài đặt:
1. Kết nối Bankend
    - Cài đặt trong 2 file ```.env.development.local``` và ```.env.production.local```
    (Đã cài)
2. Cài đặt router
    - Cài đặt trong ```src/configs/routers/index.js```

## Sử dụng:
1. Lệnh chạy cơ bản
    - Start
    > npm/yarn start
    - Build
    > npm/yarn build


3. Sử dụng các HOC để truy vấn backend
```javascript
import { useMutation, useQuery } from '@apollo/react-hooks'

