// 简单的功能测试
import { validBody } from './index.mjs';

async function test() {
  console.log('🧪 开始测试 HTML Body Validator (ESM)...\n');

  // 测试 validBody - 有效内容
  console.log('1. 测试 validBody - 有效内容:');
  const response1 = await validBody('<h1>Valid HTML</h1>');
  console.log('   状态码:', response1.status);
  console.log('   Content-Type:', response1.headers.get('Content-Type'));
  console.log('   内容:', await response1.text());

  // 测试 validBody - 空内容
  console.log('\n2. 测试 validBody - 空内容:');
  const response2 = await validBody('');
  console.log('   状态码:', response2.status);
  console.log('   内容:', await response2.text());

  // 测试 validBody - 大文件 (超过 10KB)
  console.log('\n3. 测试 validBody - 大文件:');
  const largeHtml = '<h1>Large Content</h1>' + 'x'.repeat(15000);
  const response3 = await validBody(largeHtml);
  console.log('   状态码:', response3.status);
  console.log('   内容长度:', (await response3.text()).length);

  // 测试 validBody - 小文件 (小于 10KB)
  console.log('\n4. 测试 validBody - 小文件:');
  const smallHtml = '<h1>Small Content</h1>' + 'x'.repeat(100);
  const response4 = await validBody(smallHtml);
  console.log('   状态码:', response4.status);
  console.log('   内容长度:', (await response4.text()).length);

  // 测试 validBody - Response 对象输入
  console.log('\n5. 测试 validBody - Response 对象输入:');
  const inputResponse = new Response('<h1>Response Input</h1>', { status: 200 });
  const response5 = await validBody(inputResponse);
  console.log('   状态码:', response5.status);
  console.log('   内容:', await response5.text());

  // 测试 validBody - 404 Response 对象输入
  console.log('\n6. 测试 validBody - 404 Response 对象输入:');
  const inputResponse404 = new Response('<h1>404 Content</h1>', { status: 404 });
  const response6 = await validBody(inputResponse404);
  console.log('   状态码:', response6.status);
  console.log('   是否返回原始对象:', response6 === inputResponse404);

  console.log('\n✅ 所有测试完成！');
}

test().catch(console.error); 