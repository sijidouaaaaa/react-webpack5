// 表单默认样式
export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    }
};

export const formItemLayoutEmptyLabel = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14, offset: 6 },
    }
};

// 行内表单默认样式
export const formInlineItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 19
    }
};

// 按钮样式
export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    }
};


// 按钮样式
export const tailFormItemLayoutPass = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 8,
        },
    }
};

// 地址前缀
export const pathPrefix = '/client';

// 日期标准格式
export const dateFormat = 'YYYY-MM-DD HH:mm:ss';
export const dateFormatOnlyDate = 'YYYY-MM-DD';

// 移动端时间格式化
export const phonedateFormat = 'YYYY/MM/DD HH:mm:ss';
export const phoneDateFormatOnlyDate = 'YYYY/MM/DD';


// dom常量
export const $app = document.getElementById('app');

// 统一端口
export const protocol = window.location.protocol;

export const runtime = $app.getAttribute('data-runtime');

// 七牛上传配置

// 上传限制
export const uploadSize = 2 * 1024 * 1024; //最大上传文件大小(KB)
// 上传地址
export const uploadUrl = protocol === 'https:' ? 'https://up.qbox.me' : 'http://upload.qiniu.com';



// 上传路径解析
export const uploadDecodeUrl = `${uploadkeyUrl}/resource/redirect?key=`;

// 上传token地址
export const tokenUri = $app.getAttribute('data-upload-token');

// app名称
export const appName = $app.getAttribute('data-app-name');



// bossr地址
export const bossr = $app.getAttribute('data-boss-r');

// baseURI地址
export const baseURI = $app.getAttribute('data-base');



// 表单默认样式
export const formItemLayoutPass = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    }
};


// 数字
export const numberReg =  /^(-)*(\d+)\.(\d\d).*$/;
// 大于 0 的数，最多两位小数 
export const numReg1 = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{0,2}$)/;