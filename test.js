// 简单的功能测试
const { validBody, isValidHtml, createHtmlResponse, validBodyWithScenarios } = require('./index.js');

async function test() {
  console.log('🧪 开始测试 HTML Body Validator...\n');

  // 测试 isValidHtml
  console.log('1. 测试 isValidHtml:');
  console.log('   有效HTML:', isValidHtml('<h1>Hello</h1>')); // true
  console.log('   空字符串:', isValidHtml('')); // false
  console.log('   空白字符:', isValidHtml('   ')); // false
  console.log('   非字符串:', isValidHtml(null)); // false

  // 测试 createHtmlResponse
  console.log('\n2. 测试 createHtmlResponse:');
  const response1 = createHtmlResponse('<h1>Test</h1>');
  console.log('   状态码:', response1.status);
  console.log('   Content-Type:', response1.headers.get('Content-Type'));

  // 测试 validBody - 有效内容
  console.log('\n3. 测试 validBody - 有效内容:');
  const response2 = await validBody('<h1>Valid HTML</h1>');
  console.log('   状态码:', response2.status);
  console.log('   Content-Type:', response2.headers.get('Content-Type'));
  console.log('   内容:', await response2.text());

  // 测试 validBody - 空内容
  console.log('\n4. 测试 validBody - 空内容:');
  const response3 = await validBody('');
  console.log('   状态码:', response3.status);
  console.log('   内容:', await response3.text());

  // 测试 validBodyWithScenarios
  console.log('\n5. 测试 validBodyWithScenarios - 错误场景:');
  const response4 = await validBodyWithScenarios('Some error occurred', {
    error: {
      status: 500,
      html: '<h1>自定义错误页面</h1>'
    }
  });
  console.log('   状态码:', response4.status);
  console.log('   内容:', await response4.text());

  console.log('\n✅ 所有测试完成！');
}

test().catch(console.error); 