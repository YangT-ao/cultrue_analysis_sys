<template>
  <el-form ref="form" :model="admin" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPwd">
      <el-input v-model="admin.oldPwd" placeholder="请输入旧密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input v-model="admin.newPwd" placeholder="请输入新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="admin.confirmPassword" placeholder="请确认新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {updateAdminPwd} from "../../../api/adminAPI";

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      console.log(value)
      if (this.admin.newPwd !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      admin: {
        oldPwd: undefined,
        newPwd: undefined,
        confirmPassword: undefined
      },
      updatePwdInfo: {

      },
      // 表单校验
      rules: {
        oldPwd: [
          { required: true, message: "旧密码不能为空", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },

        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateAdminPwd(this.admin).then(res => {
            if (res.code === "0") {
              this.$message.success("修改成功");
              // 将密码输入框全设置为空
              this.admin.newPwd = "";
              this.admin.oldPwd = "";
              this.admin.confirmPassword = "";
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    close() {
      this.$router.push("/admin/home")
    }
  }
};
</script>
